package fr.hyperion.defmarket.service.user;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.roles.Role;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.company.usecase.BlockAllCompanyActionUseCase;
import fr.hyperion.defmarket.ports.company.usecase.DeleteCompanyUseCase;
import fr.hyperion.defmarket.ports.crisp.AddNewPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.DeletePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.UpdatePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.file.persistence.DeleteFileAdapter;
import fr.hyperion.defmarket.ports.job.persistence.GetOneJobAdapter;
import fr.hyperion.defmarket.ports.role.persistence.GetDefaultRolesByTargetAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ExistsUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersToBeDeletedAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllUsersAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetNextUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTradersByOfferIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTradersByStoreIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.ports.user.usecase.AddUserByAdminUseCase;
import fr.hyperion.defmarket.ports.user.usecase.AdminUserUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.SendRequestInfoMailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderBlockActionUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderDeleteUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderShouldBeDeletedUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderValidateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllTradersToBeDeletedUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllTradersUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllUsersUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetNextUserUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetTradersCountAdapter;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetTradersCountUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByIdUseCase;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.service.exceptions.DuplicatedEmailException;
import fr.hyperion.defmarket.utilitary.event.BlockActionTraderEvent;
import fr.hyperion.defmarket.utilitary.event.CreateTraderByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.DeleteTraderByAdminEvent;
import fr.hyperion.defmarket.utilitary.event.SendRequestInfoMailEvent;
import fr.hyperion.defmarket.utilitary.event.UpdateIdentityEvent;
import fr.hyperion.defmarket.utilitary.event.ValidateTraderEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class UserAdministrationServiceImpl implements AddUserByAdminUseCase, GetAllTradersUseCase, GetAllUsersUseCase, GetUserByIdUseCase,
    TraderDeleteUseCase, TraderValidateUseCase, TraderBlockActionUseCase, TraderShouldBeDeletedUseCase,
    SendRequestInfoMailUseCase, AdminUserUpdateUseCase, GetNextUserUseCase, GetTradersCountUseCase, GetAllTradersToBeDeletedUseCase {

    private final UpdateUserAdapter updateUserAdapter;
    private final GetAllUsersAdapter getAllUsersAdapter;
    private final GetOneUserAdapter getOneUserAdapter;
    private final GetAllTradersAdapter getAllTradersAdapter;
    private final DeleteCompanyUseCase deleteCompanyUseCase;
    private final GetDefaultRolesByTargetAdapter getDefaultRolesByTargetAdapter;
    private final AddUserAdapter addUserAdapter;
    private final GetTradersCountAdapter getTradersCountAdapter;
    private final GetOneJobAdapter getOneJobAdapter;
    private final GetTradersByStoreIdAdapter getTradersByStoreIdAdapter;
    private final GetTradersByOfferIdAdapter getTradersByOfferIdAdapter;
    private final GetTraderByCompanyIdAdapter getTraderByCompanyIdAdapter;
    private final BlockAllCompanyActionUseCase blockAllCompanyAction;
    private final DateAndTimeUseCase dateAndTimeUseCase;
    private final GetNextUserAdapter getNextUserAdapter;
    private final ExistsUserByEmailAdapter existsUserByEmailAdapter;
    private final GetAllTradersToBeDeletedAdapter getAllTradersToBeDeletedAdapter;

    private final EventPublisher eventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final DeleteFileAdapter deleteFileAdapter;
    private final AddNewPeopleProfileUseCase addNewPeopleProfileUseCase;
    private final UpdatePeopleProfileUseCase updatePeopleProfileUseCase;
    private final DeletePeopleProfileUseCase deletePeopleProfileUseCase;


    @Override
    public DefmarketUser addUserByAdmin(final DefmarketUser user, final UserTypeEnum userType) {
        user.setPassword(UUID.randomUUID().toString());
        final String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setValidatedByAdmin(true);
        user.setMailValidated(true);
        final List<Role> defaultRoles =
            getDefaultRolesByTargetAdapter.getDefaultRoleByTarget(userType).stream()
                .map(Role.class::cast).toList();
        user.setRoles(defaultRoles);

        if (existsUserByEmailAdapter.existsByEmail(user.getEmail())) {
            throw new DuplicatedEmailException();
        }

        final DefmarketUser defmarketUser = addUserAdapter.addUser(user);
        final CreateTraderByAdminEvent createTraderByAdminEvent = new CreateTraderByAdminEvent(defmarketUser.getEmail(),
            JwtEnum.JWT_FORGOT_PASSWORD, "changePassword", "change Password",
            "modify ur password", 10, ChronoUnit.MINUTES, defmarketUser.getId().toString(), this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(createTraderByAdminEvent);
        log.info("Register operator");
        return defmarketUser;
    }

    @Override
    public Operator addUserByAdmin(final Operator user, final Long jobId) {
        user.getCompleteRegistration().setIdentityValidated(true);

        final CrispResponse crispResponse = addNewPeopleProfileUseCase.addNewPeopleProfile(user.getEmail(), user.getEmail());
        if (crispResponse.isError()) {
            log.error("Error while registering new Crisp user by Admin: " + crispResponse.getReason());
        } else {
            user.setCrispId(crispResponse.getData().get("people_id").toString());
        }

        if (jobId != null) {
            user.setJob(getOneJobAdapter.getJobById(jobId));
        }
        return (Operator) addUserByAdmin(user, UserTypeEnum.TRADER);
    }

    @Override
    public List<Long> getAllTradersToBeDeleted() {
        return getAllTradersToBeDeletedAdapter.getAllTradersToBeDeleted();
    }

    @Override
    public void deleteTrader(final Long id) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(id);
        final String firstName = user.getEmail();
        final String email = user.getEmail();
        final String crispId = user.getCrispId();
        user.setDeleted(true);
        user.setFirstName(null);
        user.setLastName(null);
        user.setEmail(null);
        user.setBirthday(null);
        user.setAddress(null);
        user.setPhone(null);
        user.setExpoTokens(null);
        user.setCrispId(null);
        if (user.getDocuments() != null && user.getDocuments().getJustificationIdentity() != null) {
            deleteFileAdapter.deleteFile(user.getDocuments().getJustificationIdentity().getPath());
        }
        user.getDocuments().setJustificationIdentity(null);
        user.getDocuments().setJustificationVeteran(null);
        user.getDocuments().setAvatar(null);
        updateUserAdapter.update(user);
        deletePeopleProfileUseCase.deletePeopleProfile(crispId);
        deleteCompanyUseCase.deleteAllCompanyOfUser(id);
        final DeleteTraderByAdminEvent deleteTraderByAdminEvent = new DeleteTraderByAdminEvent(id, firstName, email, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(deleteTraderByAdminEvent);
        log.info("Trader with id {} has been deleted by admin", id);
    }

    @Override
    public void deleteTraders(final List<Long> ids) {
        for (final Long id : ids) {
            deleteTrader(id);
        }
    }

    @Override
    public Page<DefmarketUser> getAllUsers(final Pageable pageable) {
        return getAllUsersAdapter.getAllUsers(pageable);
    }

    @Override
    public Long getTradersCount(final UserFilter userFilter, final UserTypeEnum userType) {
        return getTradersCountAdapter.getTradersCount(userFilter, userType);
    }

    @Override
    public DefmarketUser getUserById(final Long id) {
        return getOneUserAdapter.getUserById(id);
    }

    @Override
    public OperatorWithCompanies getNextUser(final Long currentUserId, final UserFilter filter, final boolean desc,
                                             final UserTypeEnum userType) {
        return getNextUserAdapter.getNextUser(currentUserId, filter, desc, userType);
    }

    @Override
    public void validateTrader(final Long userId) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(userId);
        user.setValidatedByAdmin(true);

        deleteFileAdapter.deleteFile(user.getDocuments().getJustificationIdentity().getPath());
        user.getDocuments().setJustificationIdentity(null);

        updateUserAdapter.update(user);
        final ValidateTraderEvent validateTraderEvent = new ValidateTraderEvent(userId, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(validateTraderEvent);
        log.info("Trader with id {} has been validated by admin", userId);
    }

    @Override
    public void validateTraderInfo(final Long traderId) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(traderId);
        user.setValidatedInfoByAdmin(true);
        updateUserAdapter.update(user);
        log.info("The profile of the trader with id {} has been validated by admin", traderId);
    }

    @Override
    public void sendRequestInfoMail(final Long userId, final String subject, final String message) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(userId);
        final List<Operator> users = List.of(user);
        sendRequestInfoMailToUsers(users, subject, message);
    }

    @Override
    public void sendRequestInfoMailStore(final Long storeId, final String subject, final String message) {
        final List<Operator> userList = getTradersByStoreIdAdapter.getUserByStoreId(storeId);
        sendRequestInfoMailToUsers(userList, subject, message);
    }

    @Override
    public void sendRequestInfoMailCompany(final Long companyId, final String subject, final String message) {
        final List<Operator> userList = getTraderByCompanyIdAdapter.getListTraderByCompanyId(companyId);
        sendRequestInfoMailToUsers(userList, subject, message);
    }

    @Override
    public void sendRequestInfoMailOffer(final Long offerId, final String subject, final String message) {
        final List<Operator> userList = getTradersByOfferIdAdapter.getUserByOfferId(offerId);
        sendRequestInfoMailToUsers(userList, subject, message);
    }

    public void sendRequestInfoMailToUsers(final List<Operator> users, final String subject, final String message) {
        for (final Operator user : users) {
            user.setMoreInfoRequestedByAdmin(true);
            updateUserAdapter.update(user);
            final SendRequestInfoMailEvent sendRequestInfoMailEvent = new SendRequestInfoMailEvent(user.getId(),
                subject,
                message, this, dateAndTimeUseCase.nowUTC());
            eventPublisher.publishEvent(sendRequestInfoMailEvent);
        }
    }

    @Override
    public void blockActionTrader(final Long userId, final boolean blockAction, final String reason) {
        final Operator user = (Operator) getOneUserAdapter.getUserById(userId);
        user.setBlocked(blockAction);
        blockAllCompanyAction.blockAllCompanyAction(userId, blockAction);
        updateUserAdapter.update(user);
        final BlockActionTraderEvent blockActionTraderEvent = new BlockActionTraderEvent(userId, reason, blockAction,
            this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(blockActionTraderEvent);
        log.info("Trader with id {} has been {} by admin", userId, blockAction ? "blocked" : "unblocked");
    }

    @Override
    public Page<OperatorWithCompanies> getAllTraders(final Pageable pageable, final UserFilter userFilter) {
        final Page<OperatorWithCompanies> allTraders = getAllTradersAdapter.getAllTraders(pageable, userFilter);
        return allTraders;
    }

    @Override
    public Operator updateIdentity(final Operator user, final Long jobId, final String password) {
        if (jobId != null) {
            user.setJob(getOneJobAdapter.getJobById(jobId));
        } else {
            user.setJob(null);
        }
        if (StringUtils.isNoneBlank(password)) {
            final String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
        }

        final CrispResponse crispResponse = updatePeopleProfileUseCase.updatePeopleProfile(user);
        if (crispResponse.isError()) {
            log.error("Error while updating Crisp user profile by Admin: " + crispResponse.getReason());
        }

        final Operator operator = (Operator) updateUserAdapter.updateIdentity(user);
        log.info("Identity of trader with id {} has been updated by admin", user.getId());
        final UpdateIdentityEvent updateIdentityEvent = new UpdateIdentityEvent(user, this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(updateIdentityEvent);
        return operator;
    }

    @Override
    public boolean isDeleted(final DefmarketUser user) {
        if (user.getDeleteRequestDate() != null) {
            final Instant nowInstant = dateAndTimeUseCase.nowUTC();
            final Duration duration = Duration.between(user.getDeleteRequestDate(), nowInstant);
            if (duration.toDays() > 30) {
                deleteTrader(user.getId());
                return true;
            }
        }
        return false;
    }
}
