package fr.hyperion.defmarket.adapters.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.file.DocumentAdapter;
import fr.hyperion.defmarket.adapters.roles.mapper.RoleDBMapper;
import fr.hyperion.defmarket.adapters.user.mapper.UserDBMapper;
import fr.hyperion.defmarket.common.mappers.PhoneDBMapper;
import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.database.entity.CrudPermission;
import fr.hyperion.defmarket.database.entity.DocumentDB;
import fr.hyperion.defmarket.database.entity.ExpoTokenDB;
import fr.hyperion.defmarket.database.entity.JobDB;
import fr.hyperion.defmarket.database.entity.PhoneDB;
import fr.hyperion.defmarket.database.entity.RolePermissionsDBKey;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.entity.UserRoleDB;
import fr.hyperion.defmarket.database.entity.UserRolesPermissionDB;
import fr.hyperion.defmarket.database.repository.ExpoTokenRepository;
import fr.hyperion.defmarket.database.repository.PermissionDBRepository;
import fr.hyperion.defmarket.database.repository.PublicJobRepository;
import fr.hyperion.defmarket.database.repository.UserRepository;
import fr.hyperion.defmarket.database.specification.ExpoTokenSpecification;
import fr.hyperion.defmarket.database.specification.TraderSpecification;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.user.persistence.AcceptCommunicationAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.DeleteExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ExistsUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersForNotificationAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersToBeDeletedAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetAllUsersAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetNextUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTraderByCompanyIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTradersByOfferIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetTradersByStoreIdAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.RequestDeleteTraderAdapter;
import fr.hyperion.defmarket.ports.user.persistence.RetractDeletedTraderAdapter;
import fr.hyperion.defmarket.ports.user.persistence.SearchUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserPasswordAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ValidChangeEmailAdapter;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetTradersCountAdapter;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserJpaAdapter implements GetAllTradersAdapter, AddExpoTokenAdapter, GetUserByEmailAdapter, AddUserAdapter,
    DeleteExpoTokenAdapter, GetAllUsersAdapter, GetOneUserAdapter, UpdateUserAdapter, ExistsUserByEmailAdapter,
    UpdateUserEmailAdapter, ValidChangeEmailAdapter,
    RequestDeleteTraderAdapter, RetractDeletedTraderAdapter, GetTraderByCompanyIdAdapter,
    GetAllTradersForNotificationAdapter, GetNextUserAdapter, GetTradersCountAdapter,
    SearchUserAdapter, AcceptCommunicationAdapter, GetTradersByStoreIdAdapter, GetTradersByOfferIdAdapter,
    UpdateUserPasswordAdapter, GetAllTradersToBeDeletedAdapter {

    private static final String USER_JUSTIFICATION_FILE_PATH = "user_%d/justification/";
    private final DateAndTimeUseCase dateAndTimeUseCase;
    private final UserRepository userRepository;
    private final ExpoTokenRepository expoTokenRepository;
    private final PublicJobRepository publicJobRepository;

    private final UserDBMapper userDBMapper;
    private final PhoneDBMapper phoneDBMapper;
    private final RoleDBMapper roleDBMapper;
    private final PermissionDBRepository permissionDBRepository;

    private final DocumentAdapter documentAdapter;

    @Override
    @Transactional
    public DefmarketUser addUser(final DefmarketUser user) {
        final UserAccountDB userAccountDB = userDBMapper.toEntity(user);

        userAccountDB.setRoles(user.getRoles().stream().map(role -> {
            final UserRoleDB userRoleDB = roleDBMapper.toDB(role);
            userRoleDB.setUser(userAccountDB);
            userRoleDB.setUserRolePermissions(role.getPermissions().stream().map(permission -> {
                final UserRolesPermissionDB userRolesPermissionDB = new UserRolesPermissionDB();
                userRolesPermissionDB.setPermission(permissionDBRepository.getReferenceById(permission.getId()));
                userRolesPermissionDB.setRole(userRoleDB);

                final RolePermissionsDBKey rolePermissionsDBKey = new RolePermissionsDBKey();
                rolePermissionsDBKey.setPermissionId(permission.getId());
                userRolesPermissionDB.setId(rolePermissionsDBKey);

                final CrudPermission crudPermission = new CrudPermission();
                crudPermission.setAdmin(permission.isAdmin());

                crudPermission.setCreate(permission.isCreate());
                crudPermission.setRead(permission.isRead());
                crudPermission.setUpdate(permission.isUpdate());
                crudPermission.setDelete(permission.isDelete());
                userRolesPermissionDB.setCrudPermission(crudPermission);
                return userRolesPermissionDB;
            }).toList());
            return userRoleDB;
        }).toList());

        if (user instanceof UserAccount userAccount) {
            if (userAccount.getJob() != null) {
                final JobDB jobDB = publicJobRepository.getReferenceById(userAccount.getJob().getId());
                userAccountDB.setJob(jobDB);
            }
        }

        userRepository.save(userAccountDB);
        return castUser(userAccountDB);
    }

    @Override
    @Transactional
    public DefmarketUser update(final UserAccount user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userDBMapper.toEntity((Operator) user, userAccountDB);
        if (user.getDocuments() != null) {
            if (user.getDocuments().getJustificationIdentity() != null) {
                final DocumentDB justificationIdentityDoc = documentAdapter.updateDocument(user.getDocuments().getJustificationIdentity(), userAccountDB.getJustificationIdentity());
                userAccountDB.setJustificationIdentity(justificationIdentityDoc);
            } else if (userAccountDB.getJustificationIdentity() != null) {
                final Long justificationIdentityDocumentId = userAccountDB.getJustificationIdentity().getId();
                userAccountDB.setJustificationIdentity(null);
                documentAdapter.deleteDocument(justificationIdentityDocumentId);
            }
            if (user.getDocuments().getJustificationVeteran() != null) {
                final DocumentDB justificationVeteranDoc = documentAdapter.updateDocument(user.getDocuments().getJustificationVeteran(), userAccountDB.getJustificationVeteran());
                userAccountDB.setJustificationVeteran(justificationVeteranDoc);
            } else if (userAccountDB.getJustificationVeteran() != null) {
                final Long justificationVeteranDocumentId = userAccountDB.getJustificationVeteran().getId();
                userAccountDB.setJustificationVeteran(null);
                documentAdapter.deleteDocument(justificationVeteranDocumentId);
            }
            if (user.getDocuments().getAvatar() != null) {
                final DocumentDB avatarDoc = documentAdapter.updateDocument(user.getDocuments().getAvatar(), userAccountDB.getAvatar());
                userAccountDB.setAvatar(avatarDoc);
            } else if (userAccountDB.getAvatar() != null) {
                final Long avatarDocumentId = userAccountDB.getAvatar().getId();
                userAccountDB.setAvatar(null);
                documentAdapter.deleteDocument(avatarDocumentId);
            }
        }
        return userDBMapper.toOperator(userAccountDB);
    }

    @Override
    @Transactional
    public DefmarketUser updatePassword(final DefmarketUser user, final String newPassword) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userAccountDB.setPassword(newPassword);
        return castUser(userAccountDB);
    }

    @Override
    @Transactional
    public DefmarketUser updateIdentity(final Operator user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        user.getCompleteRegistration().setIdentityValidated(true);
        if (user.getDocuments().getJustificationIdentity() != null) {
            final Document justification = documentAdapter.saveAsPrivate(user.getDocuments().getJustificationIdentity(),
                USER_JUSTIFICATION_FILE_PATH.formatted(user.getId()));
            final DocumentDB justificationIdentityDoc = documentAdapter.updateDocument(justification, userAccountDB.getJustificationIdentity());
            userAccountDB.setJustificationIdentity(justificationIdentityDoc);
        }
        userDBMapper.toEntity(user, userAccountDB);
        if (userAccountDB.getPhone() == null) {
            userAccountDB.setPhone(new PhoneDB());
        }
        phoneDBMapper.update(user.getPhone(), userAccountDB.getPhone());
        if (user.getJob() != null) {
            final JobDB jobDB = publicJobRepository.getReferenceById(user.getJob().getId());
            userAccountDB.setJob(jobDB);
        } else {
            userAccountDB.setJob(null);
        }

        return userDBMapper.toOperator(userAccountDB);
    }

    @Override
    @Transactional
    public DefmarketUser updateProfile(final UserAccount user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        if (user.getDocuments().getJustificationIdentity() != null) {
            final Document justification = documentAdapter.saveAsPrivate(user.getDocuments().getJustificationIdentity(),
                USER_JUSTIFICATION_FILE_PATH.formatted(user.getId()));
            final DocumentDB justificationIdentityDoc = documentAdapter.updateDocument(justification, userAccountDB.getJustificationIdentity());
            userAccountDB.setJustificationIdentity(justificationIdentityDoc);
        }
        if (user.getJob() != null) {
            final JobDB jobDB = publicJobRepository.getReferenceById(user.getJob().getId());
            userAccountDB.setJob(jobDB);
        } else {
            userAccountDB.setJob(null);
        }
        userDBMapper.toEntity((Operator) user, userAccountDB);
        if (userAccountDB.getPhone() == null) {
            userAccountDB.setPhone(new PhoneDB());
        }
        phoneDBMapper.update(user.getPhone(), userAccountDB.getPhone());
        return castUser(userAccountDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DefmarketUser> getAllUsers(final Pageable pageable) {
        final Page<UserAccountDB> allUsersDB = userRepository.findAll(pageable);
        return allUsersDB.map(this::castUser);
    }

    @Override
    @Transactional(readOnly = true)
    public DefmarketUser getUserByEmail(final String email, final UserTypeEnum userType) {
        final Specification<UserAccountDB> getUser = Specification.where(TraderSpecification.getByUserType(userType))
            .and(TraderSpecification.getByUserEmail(email))
            .and(TraderSpecification.notDeleted());
        final UserAccountDB userAccountDB = userRepository.findOne(getUser).orElseThrow();
        return castUser(userAccountDB);
    }

    @Override
    @Transactional(readOnly = true)
    public DefmarketUser getUserById(final Long id) {
        final UserAccountDB userAccountDB = userRepository.findById(id).orElseThrow();
        return castUser(userAccountDB);
    }

    @Override
    @Transactional(readOnly = true)
    public OperatorWithCompanies getNextUser(final Long currentUserId, final UserFilter filter, final boolean desc,
                                             final UserTypeEnum userType) {
        final UserAccountDB nextUser = userRepository.findNextUser(currentUserId, filter, desc, userType);
        return userDBMapper.toOperator(nextUser);
    }

    private DefmarketUser castUser(final UserAccountDB userAccountDB) {
        return switch (userAccountDB.getUserType()) {
            case ADMIN -> userDBMapper.toAdmin(userAccountDB);
            case TRADER -> userDBMapper.toOperator(userAccountDB);
            default -> throw new IllegalArgumentException("Unknown user type");
        };
    }

    @Override
    @Transactional
    public void addExpoToken(final Long id, final String expoToken) {
        final UserAccountDB userAccountDB = userRepository.findById(id).orElseThrow();
        final Optional<ExpoTokenDB> optionalExpoTokenByUser = findExpoTokenByUser(expoToken, userAccountDB);
        if (optionalExpoTokenByUser.isPresent()) {
            final ExpoTokenDB expoTokenDB = optionalExpoTokenByUser.get();
            expoTokenDB.setLastCheck(dateAndTimeUseCase.nowUTC());
        } else {
            final ExpoTokenDB expoTokenDB = new ExpoTokenDB();
            expoTokenDB.setExpoToken(expoToken);
            expoTokenDB.setActive(true);
            expoTokenDB.setLastCheck(dateAndTimeUseCase.nowUTC());
            expoTokenDB.setUserAccountDB(userAccountDB);
            userAccountDB.addExpoToken(expoTokenDB);
        }
    }

    @Override
    @Transactional
    public void deleteExpoToken(final Long id, final String expoToken) {
        final UserAccountDB userAccountDB = userRepository.findById(id).orElseThrow();
        final Optional<ExpoTokenDB> optionalExpoTokenByUser = findExpoTokenByUser(expoToken, userAccountDB);
        optionalExpoTokenByUser.ifPresent(expoTokenRepository::delete);
    }

    private Optional<ExpoTokenDB> findExpoTokenByUser(final String expoToken, final UserAccountDB accountDB) {
        final Specification<ExpoTokenDB> specification = ExpoTokenSpecification.byExpoToken(expoToken)
            .and(ExpoTokenSpecification.byUserAccount(accountDB));
        return expoTokenRepository.findOne(specification);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByEmail(final String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    @Transactional
    public Page<OperatorWithCompanies> getAllTraders(final Pageable pageable, final UserFilter userFilter) {
        final Page<UserAccountDB> allUserAccounts = userRepository.findAllTraders(pageable, userFilter);
        return allUserAccounts.map(userDBMapper::toOperator);
    }

    @Override
    @Transactional(readOnly = true)
    public Long getTradersCount(final UserFilter userFilter, final UserTypeEnum userType) {
        return userRepository.countTraders(userFilter, userType);
    }

    @Override
    @Transactional
    public DefmarketUser getTraderByCompanyId(final Long id) {
        final Specification<UserAccountDB> specifications = Specification.where(TraderSpecification.getByCompanyId(id));
        final UserAccountDB userAccountDB = userRepository.findOne(specifications).orElseThrow();
        return castUser(userAccountDB);
    }

    @Override
    @Transactional
    public void updateEmail(final Operator user, final String oldEmail, final String newEmail) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        if (!userAccountDB.getEmail().equals(oldEmail)) {
            throw new IllegalArgumentException();
        }
        userAccountDB.setNewEmail(newEmail);
        userDBMapper.toData(userAccountDB);
    }

    @Override
    @Transactional
    public void changeEmail(final Operator user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userAccountDB.setEmail(userAccountDB.getNewEmail());
        userAccountDB.setNewEmail(null);
        userDBMapper.toData(userAccountDB);
    }

    @Override
    @Transactional
    public void requestDeleteAdapter(final Operator user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userAccountDB.setDeleteRequestDate(dateAndTimeUseCase.nowUTC());
        userDBMapper.toData(userAccountDB);
    }

    @Override
    @Transactional
    public void retractDeletedAdapter(final Operator user) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userAccountDB.setDeleteRequestDate(null);
        userDBMapper.toData(userAccountDB);
    }

    @Override
    @Transactional
    public List<Operator> getAllTradersForNotification(final List<Address> addressList, final StoreTypeEnum storeType,
                                                       final Long storeCategoryId) {
        final Specification<UserAccountDB> specification = Specification.where(TraderSpecification.notDeleted())
            .and(byAddressList(addressList))
            .and(TraderSpecification.getByStoreCategoryId(storeCategoryId))
            .and(TraderSpecification.getByStoreType(storeType));
        final List<UserAccountDB> allTrader = userRepository.findAll(specification);

        final List<UserAccountDB> tradersDistinctById = allTrader.stream().distinct()
            .toList();

        return userDBMapper.toOperator(tradersDistinctById);
    }

    private Specification<UserAccountDB> byAddressList(final List<Address> addressList) {
        Specification<UserAccountDB> specification = null;
        for (final Address address : addressList) {
            final Specification<UserAccountDB> addressSpecification = Specification
                .where(TraderSpecification.getByDepartement(address.getDepartment()))
                .and(TraderSpecification.getByCity(address.getCity()));
            if (specification == null) {
                specification = Specification.where(addressSpecification);
            } else {
                specification = Specification.where(specification).or(addressSpecification);
            }
        }
        return specification;
    }

    @Transactional(readOnly = true)
    @Override
    public Page<UserAccount> searchByDetails(final Pageable pageable, final String input, final UserTypeEnum userType) {
        final Page<UserAccountDB> result;
        if (input != null) {
            result = userRepository.findByDetails(pageable, input, userType);
        } else {
            final Specification<UserAccountDB> specification = Specification.where(TraderSpecification.notDeleted());
            result = userRepository.findAll(specification, pageable);
        }
        return result.map(userDBMapper::toOperator);
    }

    @Override
    @Transactional
    public void acceptCommunication(final Operator user, final Boolean communication) {
        final UserAccountDB userAccountDB = userRepository.findById(user.getId()).orElseThrow();
        userAccountDB.setCommunication(communication);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Operator> getListTraderByCompanyId(final Long companyId) {
        final Specification<UserAccountDB> specifications = Specification
            .where(TraderSpecification.getByCompanyId(companyId));
        final List<UserAccountDB> userAccountDBs = userRepository.findAll(specifications);
        return userDBMapper.toOperator(userAccountDBs);
    }

    @Override
    @Transactional
    public List<Operator> getUserByStoreId(final Long storeId) {
        final Specification<UserAccountDB> spec = Specification.where(TraderSpecification.getByStoreId(storeId));
        final List<UserAccountDB> allTrader = userRepository.findAll(spec);
        return userDBMapper.toOperator(allTrader);
    }

    @Override
    @Transactional
    public List<Operator> getUserByOfferId(final Long offerId) {
        final Specification<UserAccountDB> spec = Specification.where(TraderSpecification.getByOfferId(offerId));
        final List<UserAccountDB> allTrader = userRepository.findAll(spec);
        return userDBMapper.toOperator(allTrader);
    }

    @Override
    @Transactional
    public List<Long> getAllTradersToBeDeleted() {
        final Specification<UserAccountDB> userAccountSpecification = Specification
            .where(TraderSpecification.notDeleted()).and(TraderSpecification.canBeDeleted());
        final List<UserAccountDB> userAccountDBList = userRepository.findAll(userAccountSpecification);
        return userAccountDBList.stream()
            .map(UserAccountDB::getId)
            .toList();
    }
}
