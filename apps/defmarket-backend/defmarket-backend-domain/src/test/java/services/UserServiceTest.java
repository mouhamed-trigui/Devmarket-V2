package services;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.hyperion.defmarket.data.UserDocument;
import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.crisp.AddNewPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.UpdatePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.job.persistence.GetOneJobAdapter;
import fr.hyperion.defmarket.ports.redirection.persistence.DeleteRedirectionAdapter;
import fr.hyperion.defmarket.ports.role.persistence.GetDefaultRolesByTargetAdapter;
import fr.hyperion.defmarket.ports.user.gateway.DefmarketPropertyGateway;
import fr.hyperion.defmarket.ports.user.mail.PublishEmail;
import fr.hyperion.defmarket.ports.user.persistence.AddExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.AddUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.DeleteExpoTokenAdapter;
import fr.hyperion.defmarket.ports.user.persistence.ExistsUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.GetUserByEmailAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserPasswordAdapter;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.service.user.JwtHelper;
import fr.hyperion.defmarket.service.user.UserAdministrationServiceImpl;
import fr.hyperion.defmarket.service.user.UserServiceImpl;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @InjectMocks
    private UserServiceImpl userService;
    @InjectMocks
    private UserAdministrationServiceImpl userAdministrationService;
    @Mock
    private GetOneJobAdapter getOneJobAdapter;
    @Mock
    private UpdateUserPasswordAdapter updateUserPasswordAdapter;
    @Mock
    private UpdateUserAdapter updateUserAdapter;
    @Mock
    private AddUserAdapter addUserAdapter;
    @Mock
    private GetUserByEmailAdapter getUserByEmailAdapter;
    @Mock
    private AddExpoTokenAdapter addExpoTokenAdapter;
    @Mock
    private DeleteExpoTokenAdapter deleteExpoTokenAdapter;
    @Mock
    private ExistsUserByEmailAdapter existsUserByEmailAdapter;
    @Mock
    private DeleteRedirectionAdapter deleteRedirectionAdapter;
    @Mock
    private DateAndTimeUseCase dateAndTimeUseCase;
    @Mock
    private GetDefaultRolesByTargetAdapter getDefaultRolesByTargetAdapter;
    @Mock
    private AddNewPeopleProfileUseCase addNewPeopleProfileUseCase;
    @Mock
    private UpdatePeopleProfileUseCase updatePeopleProfileUseCase;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private PublishEmail publishEmail;
    @Mock
    private DefmarketPropertyGateway defmarketPropertyGateway;
    @Mock
    private JwtHelper jwtHelper;
    @Mock
    private EventPublisher eventPublisher;


    private UserAccount userAccount;
    private Operator operator;
    private Job job;
    private DefmarketUser defmarketUser;
    private CrispResponse crispResponse;

    private final String email = "houssemtrikigmail.com";

    @BeforeEach
    public void setup() {
        System.out.println("Initializing");
        userAccount = new UserAccount();
        userAccount.setEmail("houssem.triki@gmail.com");
        userAccount.setPassword("123456");
        userAccount.setDocuments(new UserDocument());
        defmarketUser = new DefmarketUser();
        defmarketUser.setEmail("houssem.triki@gmail.com");
        defmarketUser.setId(6L);
        job = new Job();
        operator = new Operator();
        job.setId(4L);
        crispResponse = new CrispResponse();
        crispResponse.setError(true);
        crispResponse.setReason("Not found");
    }

    @Test
    public void shouldAddUser() {
        when(passwordEncoder.encode(anyString())).thenReturn("");
        final Operator operator = new Operator();
        operator.setEmail("triki@gmail.com");
        operator.setPassword("Triki99..");
        operator.setId(5L);
        when(addUserAdapter.addUser(any(Operator.class))).thenReturn(operator);
        when(getDefaultRolesByTargetAdapter.getDefaultRoleByTarget(any())).thenReturn(new ArrayList<>());
        when(addNewPeopleProfileUseCase.addNewPeopleProfile(anyString(), anyString())).thenReturn(crispResponse);
        assertEquals(operator.getEmail(), userService.addUser(operator).getEmail());
    }


    @Test
    public void shouldGetUserByEmail() {
        when(getUserByEmailAdapter.getUserByEmail(anyString(), any(UserTypeEnum.class))).thenReturn(defmarketUser);
        assertEquals(defmarketUser, userService.getUserByEmail(defmarketUser.getEmail()));
    }

    @Test
    public void shouldUpdateUser() {
        when(dateAndTimeUseCase.nowUTC()).thenReturn(Instant.now());
        when(updatePeopleProfileUseCase.updatePeopleProfile(any(UserAccount.class))).thenReturn(crispResponse);
        when(updateUserAdapter.updateIdentity(any(Operator.class))).thenReturn(operator);
        assertEquals(operator, userAdministrationService.updateIdentity(new Operator(), 4L, null));
    }

    @Test
    public void shouldRestPassword() {
        final String newPassword = "123456";
        when(getUserByEmailAdapter.getUserByEmail(anyString(), any(UserTypeEnum.class))).thenReturn(userAccount);
        when(passwordEncoder.encode(anyString())).thenReturn(newPassword);
        when(updateUserAdapter.update(any(UserAccount.class))).thenReturn(defmarketUser);
        assertDoesNotThrow(() -> userService.resetPassword(email, newPassword));
    }

    @Test
    public void shouldChangePassword() {
        final String oldPassword = "123456";
        final String newPassword = "123456";
        when(getUserByEmailAdapter.getUserByEmail(anyString(), any(UserTypeEnum.class))).thenReturn(userAccount);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(passwordEncoder.encode(anyString())).thenReturn(newPassword);
        when(updateUserPasswordAdapter.updatePassword(any(DefmarketUser.class), anyString())).thenReturn(defmarketUser);
        assertDoesNotThrow(() -> userService.changePassword(email, oldPassword, newPassword));
    }

    @Test
    public void shouldChangePasswordThrowsException() {
        final String newPassword = "123456";
        when(getUserByEmailAdapter.getUserByEmail(email, UserTypeEnum.TRADER)).thenReturn(userAccount);
        assertThrows(IllegalArgumentException.class, () -> userService.changePassword(email,
            userAccount.getPassword(), newPassword));
    }

    @Test
    public void shouldSendEmail() {

        when(getUserByEmailAdapter.getUserByEmail(anyString(), any(UserTypeEnum.class))).thenReturn(defmarketUser);
        assertDoesNotThrow(() -> userService.sendEmailForgetPassword(email));

    }

    @Test
    public void shouldValidateEmail() {
        final String key = "XA33Z4RSTXYGAYhfy";
        when(getUserByEmailAdapter.getUserByEmail(anyString(), any())).thenReturn(userAccount);
        when(updateUserAdapter.update(any())).thenReturn(userAccount);
        doNothing().when(deleteRedirectionAdapter).deleteRedirectionMapper(anyString());
        assertDoesNotThrow(() -> userService.validateEmail(email, key));
    }

    @Test
    public void shouldUpdateIdentityAndJob() {
        operator.setJob(job);
        when(getOneJobAdapter.getJobById(4L)).thenReturn(job);
        when(updateUserAdapter.updateIdentity(any(Operator.class))).thenReturn(operator);
        assertDoesNotThrow(() -> userService.updateIdentityAndJob(operator, job.getId()));
    }

    @Test
    public void shouldAddExpoToken() {
        doNothing().when(addExpoTokenAdapter).addExpoToken(anyLong(), anyString());
        assertDoesNotThrow(() -> userService.addExpoToken(4L, "NewExpoToken"));
    }

    @Test
    public void shouldDeleteExpoToken() {
        doNothing().when(deleteExpoTokenAdapter).deleteExpoToken(anyLong(), anyString());
        assertDoesNotThrow(() -> userService.deleteExpoToken(2L, "OldExpoToken"));
    }

    @Test
    public void ShouldExistsByEmail() {
        when(existsUserByEmailAdapter.existsByEmail(anyString())).thenReturn(true);
        assertDoesNotThrow(() -> userService.existsByEmail(email));
    }

    @Test
    public void ShouldNotExistsByEmail() {
        when(existsUserByEmailAdapter.existsByEmail(anyString())).thenReturn(false);
        assertDoesNotThrow(() -> userService.existsByEmail(email));
    }
}
