package fr.hyperion.defmarket.service.user;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.roles.Role;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.crisp.AddNewPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.UpdatePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.job.persistence.GetOneJobAdapter;
import fr.hyperion.defmarket.ports.redirection.persistence.DeleteRedirectionAdapter;
import fr.hyperion.defmarket.ports.role.persistence.GetDefaultRolesByTargetAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AcceptCommunicationAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.DeleteExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ExistsUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.RequestDeleteTraderAdapter;
import fr.hyperion.defmarket.ports.user.persistence.RetractDeletedTraderAdapter;
import fr.hyperion.defmarket.ports.user.persistence.SearchUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserPasswordAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ValidChangeEmailAdapter;
import fr.hyperion.defmarket.ports.user.usecase.AcceptCommunicationUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ExistsUserByEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.RequestDeleteTraderUseCase;
import fr.hyperion.defmarket.ports.user.usecase.RetractDeletedTraderUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UpdateUserEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UsePushNotifUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserChangeNewEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserEmailValidationUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserExpoTokensUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserFactoryUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserForgetPasswordUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ValidChangeEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ValidNewPasswordUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserNotifByIdUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.SearchUserUseCase;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.service.exceptions.DuplicatedEmailException;
import fr.hyperion.defmarket.utilitary.event.ForgetPasswordEvent;
import fr.hyperion.defmarket.utilitary.event.RequestChangePasswordEvent;
import fr.hyperion.defmarket.utilitary.event.RequestDeleteTraderEvent;
import fr.hyperion.defmarket.utilitary.event.SendEmailToChangeEmailEvent;
import fr.hyperion.defmarket.utilitary.event.SendEmailWithTokenEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserFactoryUseCase, UserUpdateUseCase, ExistsUserByEmailUseCase,
    GetUserByEmailUseCase, UserForgetPasswordUseCase
    , UserEmailValidationUseCase, UserExpoTokensUseCase, UsePushNotifUpdateUseCase, GetUserNotifByIdUseCase,
    UpdateUserEmailUseCase
    , UserChangeNewEmailUseCase, ValidChangeEmailUseCase, RequestDeleteTraderUseCase, RetractDeletedTraderUseCase,
    SearchUserUseCase, ValidNewPasswordUseCase, AcceptCommunicationUseCase {

    private final UpdateUserAdapter updateUserAdapter;
    private final GetOneUserAdapter getOneUserAdapter;
    private final AddUserAdapter addUserAdapter;
    private final RequestDeleteTraderAdapter requestDeleteTraderAdapter;
    private final RetractDeletedTraderAdapter retractDeletedTraderAdapter;
    private final GetUserByEmailAdapter getUserByEmailAdapter;
    private final AddExpoTokenAdapter addExpoTokenAdapter;
    private final DeleteExpoTokenAdapter deleteExpoTokenAdapter;
    private final ExistsUserByEmailAdapter existsUserByEmailAdapter;
    private final UpdateUserEmailAdapter updateUserEmailAdapter;
    private final ValidChangeEmailAdapter validChangeEmailAdapter;
    private final GetOneJobAdapter getOneJobAdapter;
    private final GetDefaultRolesByTargetAdapter getDefaultRolesByTargetAdapter;
    private final SearchUserAdapter searchUserAdapter;
    private final AcceptCommunicationAdapter acceptCommunicationAdapter;
    private final UpdateUserPasswordAdapter updateUserPasswordAdapter;
    private final DeleteRedirectionAdapter deleteRedirectionAdapter;

    private final DateAndTimeUseCase dateAndTimeUseCase;

    private final PasswordEncoder passwordEncoder;
    private final EventPublisher eventPublisher;
    private final AddNewPeopleProfileUseCase addNewPeopleProfileUseCase;
    private final UpdatePeopleProfileUseCase updatePeopleProfileUseCase;

    @Override
    public Operator addUser(final Operator user) {
        log.info("Register operator");

        if (existsUserByEmailAdapter.existsByEmail(user.getEmail())) {
            throw new DuplicatedEmailException();
        }

        final CrispResponse crispResponse = addNewPeopleProfileUseCase.addNewPeopleProfile(user.getEmail(), user.getEmail());
        if (!crispResponse.isError()) {
            user.setCrispId(crispResponse.getData().get("people_id").toString());
        }

        final String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        final List<Role> defaultRoles =
            getDefaultRolesByTargetAdapter.getDefaultRoleByTarget(UserTypeEnum.TRADER).stream()
                .map(Role.class::cast).toList();
        user.setRoles(defaultRoles);


        final Operator operator = (Operator) addUserAdapter.addUser(user);
        sendEmailWithToken(operator.getEmail(), JwtEnum.JWT_VALIDATE_EMAIL, "ActivationMail", "Defmarket account " +
                "register"
            , "Validate your E-mail", 15, ChronoUnit.DAYS, operator.getId().toString());
        return operator;
    }

    @Override
    public Operator updateIdentityAndJob(final Operator user, final Long jobId) {
        if (jobId != null) {
            user.setJob(getOneJobAdapter.getJobById(jobId));
        } else {
            user.setJob(null);
        }
        updatePeopleProfileUseCase.updatePeopleProfile(user);
        return (Operator) updateUserAdapter.updateIdentity(user);
    }

    @Override
    public DefmarketUser getUserByEmail(final String email, final UserTypeEnum userType) {
        return getUserByEmailAdapter.getUserByEmail(email, userType);
    }

    @Override
    public DefmarketUser getUserByEmail(final String email) {
        return getUserByEmail(email, UserTypeEnum.TRADER);
    }

    @Override
    public Operator updateProfile(final Long jobId, final Operator user) {
        final Operator operator = (Operator) getUserById(user.getId());
        if (operator.isValidatedByAdmin()) {
            if ((operator.getBirthCity() != null && !operator.getBirthCity().equalsIgnoreCase(user.getBirthCity()))
                || (!operator.getFirstName().equalsIgnoreCase(user.getFirstName()))
                || (!operator.getLastName().equalsIgnoreCase(user.getLastName()))
                || (!operator.getBirthday().equals(user.getBirthday()))
            ) {
                user.setValidatedByAdmin(false);
                Assert.notNull(user.getDocuments().getJustificationIdentity(), "Your identity is required to finish " +
                    "updating data !");
                Assert.isTrue(user.getDocuments().getJustificationIdentity().equals(operator.getDocuments().getJustificationIdentity()), "Your identity is required to finish updating data !");
            }
        }
        if (jobId != null) {
            user.setJob(getOneJobAdapter.getJobById(jobId));
        } else {
            user.setJob(null);
        }
        if (user.getPhone() != null && !StringUtils.isBlank(user.getFirstName())
            && !StringUtils.isBlank(user.getLastName()) && (!user.isVeteran() || (user.isVeteran() && user.getJob() != null))
            && !StringUtils.isBlank(user.getAddress().getCity()) && !StringUtils.isBlank(user.getBirthCity())
            && user.getBirthday() != null && user.getDocuments().getJustificationIdentity() != null) {
            user.getCompleteRegistration().setProfileCompleted(true);
        }
        user.setMoreInfoRequestedByAdmin(false);
        final Operator updatedOperator = (Operator) updateUserAdapter.updateProfile(user);
        log.info("Profile of trader id {} has been updated in DB", user.getId());
        updatePeopleProfileUseCase.updatePeopleProfile(user);
        return updatedOperator;
    }

    @Override
    public void resetPassword(final String email, final String newPassword) {
        final UserAccount user = (UserAccount) getUserByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        updateUserAdapter.update(user);
    }

    @Override
    public void changePassword(final String email, final String oldPassword, final String newPassword) {
        final DefmarketUser user = getUserByEmail(email);
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException();
        }
        updateUserPasswordAdapter.updatePassword(user, passwordEncoder.encode(newPassword));
        final RequestChangePasswordEvent requestChangePasswordEvent = new RequestChangePasswordEvent(email, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(requestChangePasswordEvent);
        log.info("Password  of user id {} has been changed", user.getId());
    }

    @Override
    public void sendEmailForgetPassword(final String email) {
        final ForgetPasswordEvent forgetPasswordEvent = new ForgetPasswordEvent(email,
            JwtEnum.JWT_FORGOT_PASSWORD, "changePassword", "Forget Password", "modify ur password", 10,
            ChronoUnit.MINUTES, getUserByEmail(email).getId().toString(), this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(forgetPasswordEvent);
    }

    @Override
    public void validateEmail(final String email, final String key) {
        final DefmarketUser user = getUserByEmail(email, null);
        user.setMailValidated(true);
        updateUserAdapter.update((UserAccount) user);
        deleteRedirectionAdapter.deleteRedirectionMapper(key);
        log.info("Email of user id {} has been validated", user.getId());
    }

    @Override
    public void resendValidateEmail(final String email) {
        if (existsByEmail(email)) {
            sendEmailWithToken(email, JwtEnum.JWT_VALIDATE_EMAIL, "ActivationMail", "Defmarket account register"
                , "Validate your E-mail", 15, ChronoUnit.DAYS, getUserByEmail(email).getId().toString());
        }
    }

    private void sendEmailWithToken(final String email, final JwtEnum jwtRole, final String root, final String subject, final String message, final int tokenValidity, final TemporalUnit tmp, final String id) {
        final SendEmailWithTokenEvent sendEmailWithTokenEvent = new SendEmailWithTokenEvent(email, jwtRole, root, subject,
            message, tokenValidity, tmp, id, this, dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(sendEmailWithTokenEvent);
    }

    @Override
    public void pushNotification(final Long id, final boolean active) {
        final DefmarketUser user = getOneUserAdapter.getUserById(id);
        user.setPushNotificationActive(active);
        updateUserAdapter.update((UserAccount) user);
    }

    @Override
    public void addExpoToken(final Long userId, final String expoToken) {
        if (expoToken != null) {
            addExpoTokenAdapter.addExpoToken(userId, expoToken);
        }
    }

    @Override
    public void deleteExpoToken(final Long userId, final String expoToken) {
        deleteExpoTokenAdapter.deleteExpoToken(userId, expoToken);
        log.info("ExpoToken of User with id {} has been deleted", userId);
    }

    @Override
    public boolean existsByEmail(final String email) {
        return existsUserByEmailAdapter.existsByEmail(email);
    }

    @Override
    public DefmarketUser getUserById(final Long id) {
        return getOneUserAdapter.getUserById(id);
    }

    @Override
    public void updateEmail(final Operator user, final String oldEmail, final String newEmail) {
        if (existsUserByEmailAdapter.existsByEmail(newEmail)) {
            throw new DuplicatedEmailException();
        }
        updateUserEmailAdapter.updateEmail(user, oldEmail, newEmail);
        log.info("Email of the user with id {} has been updated", user.getId());
    }

    @Override
    public void sendEmailToChangeEmail(final Operator user) {
        final SendEmailToChangeEmailEvent sendEmailToChangeEmailEvent = new SendEmailToChangeEmailEvent(user, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(sendEmailToChangeEmailEvent);
    }

    @Override
    public void changeEmail(final Operator user, final String key) {
        validChangeEmailAdapter.changeEmail(user);
        deleteRedirectionAdapter.deleteRedirectionMapper(key);
        log.info("Email of the user with id {} has been changed", user.getId());
    }

    @Override
    public void requestDeleteTrader(final Operator user) {
        requestDeleteTraderAdapter.requestDeleteAdapter(user);
        final RequestDeleteTraderEvent requestDeleteTraderEvent = new RequestDeleteTraderEvent(user, this,
            dateAndTimeUseCase.nowUTC());
        eventPublisher.publishEvent(requestDeleteTraderEvent);
        log.info("Request for delete trader id {}", user.getId());
    }

    @Override
    public void retractDeletedTrader(final Operator user) {
        retractDeletedTraderAdapter.retractDeletedAdapter(user);
    }

    @Override
    public void validNewPassword(final DefmarketUser operator, final String newPassword, final String key) {
        final DefmarketUser defmarketUser = getUserById(operator.getId());
        final String encodedPassword = passwordEncoder.encode(newPassword);
        updateUserPasswordAdapter.updatePassword(defmarketUser, encodedPassword);
        deleteRedirectionAdapter.deleteRedirectionMapper(key);
        log.info("New password of User id {} has been validated", operator.getId());
    }


    @Override
    public Page<UserAccount> searchByDetails(final Pageable pageable, final String input, final UserTypeEnum userType) {
        return searchUserAdapter.searchByDetails(pageable, input, userType);
    }

    @Override
    public void acceptCommunication(final Operator user, final Boolean communication) {
        acceptCommunicationAdapter.acceptCommunication(user, communication);
    }
}
