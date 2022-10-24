package fr.hyperion.defmarket.controller.user;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.user.mapper.UserMapper;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.dto.request.user.NewPasswordRequest;
import fr.hyperion.defmarket.dto.request.user.UserEmailRequest;
import fr.hyperion.defmarket.dto.request.user.UsernameAndPasswordAuthenticationRequest;

import fr.hyperion.defmarket.dto.response.user.ExistingEmailResponse;
import fr.hyperion.defmarket.dto.response.user.JwtResponse;
import fr.hyperion.defmarket.dto.response.user.UserBasicResponse;
import fr.hyperion.defmarket.ports.crisp.AddNewCrispProfileIfNotExistUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ExistsUserByEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderShouldBeDeletedUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserEmailValidationUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserExpoTokensUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserForgetPasswordUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ValidNewPasswordUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByIdUseCase;
import fr.hyperion.defmarket.service.exceptions.InvalidEmailException;
import fr.hyperion.defmarket.service.exceptions.UnauthorizedException;
import fr.hyperion.defmarket.service.user.JwtUserDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@RestController
@RequestMapping(AbstractController.APP_PREFIX + "/auth")
@RequiredArgsConstructor
public class AuthController extends AbstractController {

    private final UserForgetPasswordUseCase userForgetPasswordUseCase;
    private final UserEmailValidationUseCase userEmailValidationUseCase;
    private final TraderShouldBeDeletedUseCase traderShouldBeDeletedUseCase;
    private final ExistsUserByEmailUseCase existsUserByEmailUseCase;
    private final ValidNewPasswordUseCase validNewPasswordUseCase;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final GetUserByIdUseCase getUserByIdUseCase;
    private final UserExpoTokensUseCase expoTokensUseCase;
    private final GetUserByEmailUseCase getUserByEmailUseCase;
    private final AddNewCrispProfileIfNotExistUseCase addNewCrispProfileIfNotExistUseCase;

    @Operation(summary = "Login")
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid final UsernameAndPasswordAuthenticationRequest authenticationRequest, final BindingResult result) {
        checkBindingResult(result);

        final String username = authenticationRequest.getEmail();
        final DefmarketUser userDetails;
        try {
            userDetails = getUserByEmailUseCase.getUserByEmail(username, authenticationRequest.getUserType());
        } catch (final Exception e) {
            throw new UnauthorizedException();
        }

        if (passwordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword())) {
            if (!userDetails.isMailValidated()) {
                throw new InvalidEmailException();
            }
            if (authenticationRequest.getExpoToken() != null && !authenticationRequest.getExpoToken().isEmpty()) {
                expoTokensUseCase.addExpoToken(userDetails.getId(), authenticationRequest.getExpoToken());
            }
            if (traderShouldBeDeletedUseCase.isDeleted(userDetails)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            return ResponseEntity.ok(new JwtResponse(jwtUserDetailsService.getAccessToken(userDetails), jwtUserDetailsService.getRefreshToken(userDetails)));
        }
        throw new UnauthorizedException();
    }

    @Operation(summary = "Refresh Token  ", description = "Should pass refresh token as a parameter in authorization ")
    @PostMapping("/refresh-token")
    public ResponseEntity<JwtResponse> refreshToken(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt principal) {
        final DefmarketUser user = getUserByEmailUseCase.getUserByEmail(principal.getSubject(), null);
        return ResponseEntity.ok(new JwtResponse(jwtUserDetailsService.getAccessToken(user), null));
    }

    @Operation(summary = "Validate Email", description = "Should pass Activation Mail token as a parameter in authorization ")
    @PostMapping("/validate-email")
    public ResponseEntity<?> validateEmail(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        userEmailValidationUseCase.validateEmail(jwt.getSubject(), jwt.getClaim("key"));
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Resend Validate Email")
    @PostMapping("/resend-validate-email")
    public ResponseEntity<?> resendValidateEmail(@Valid @RequestBody final UserEmailRequest userEmailRequest) {
        userEmailValidationUseCase.resendValidateEmail(userEmailRequest.email);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Forget Password", description = "Should pass access token as a parameter in authorization ")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgetPassword(@Valid @RequestBody final UserEmailRequest userEmailRequest) {
        userForgetPasswordUseCase.sendEmailForgetPassword(userEmailRequest.email);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Confirm new password ", description = "Should pass forgetPassword token as a parameter in authorization ")
    @PatchMapping("/confirm-new-password")
    public ResponseEntity<Void> confirmNewPassword(@Valid @RequestBody final NewPasswordRequest newPassword,
                                                   @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final DefmarketUser defmarketUser = getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        validNewPasswordUseCase.validNewPassword(defmarketUser, newPassword.newPassword, jwt.getClaim("key"));
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get My Information", description = "Should pass access token as a parameter in authorization ")
    @GetMapping("/me")
    public ResponseEntity<UserBasicResponse> myInfo(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final DefmarketUser user = getUserByEmailUseCase.getUserByEmail(jwt.getSubject(), null);
        if (user instanceof UserAccount userAccount) {
            addNewCrispProfileIfNotExistUseCase.addNewCrispProfile(userAccount);
        }
        final UserBasicResponse userResponse = userMapper.toResponse(user);
        return ResponseEntity.ok(userResponse);
    }

    @Operation(summary = "Check if Email Exists")
    @PostMapping("/exists-by-email")
    public ResponseEntity<ExistingEmailResponse> existsByEmail(@RequestBody @Valid final UserEmailRequest userEmailRequest) {
        final ExistingEmailResponse response = new ExistingEmailResponse();
        response.existingEmail = existsUserByEmailUseCase.existsByEmail(userEmailRequest.email);
        return ResponseEntity.ok(response);
    }
}

