package fr.hyperion.defmarket.controller.pro.user;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.store.mapper.StoreMapper;
import fr.hyperion.defmarket.controller.pro.user.mapper.UserProMapper;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.dto.request.user.EmailChangeRequest;
import fr.hyperion.defmarket.dto.request.user.ExpoTokenRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationInitRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationRequest;
import fr.hyperion.defmarket.dto.request.user.PasswordChangeRequest;
import fr.hyperion.defmarket.dto.request.user.TraderUpdateRequest;
import fr.hyperion.defmarket.dto.response.store.StoreDetailedWithCompanyIdResponse;
import fr.hyperion.defmarket.dto.response.user.UserResponse;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByUserIdUseCase;
import fr.hyperion.defmarket.ports.user.usecase.AcceptCommunicationUseCase;
import fr.hyperion.defmarket.ports.user.usecase.RequestDeleteTraderUseCase;
import fr.hyperion.defmarket.ports.user.usecase.RetractDeletedTraderUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UpdateUserEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UsePushNotifUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserChangeNewEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserExpoTokensUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserFactoryUseCase;
import fr.hyperion.defmarket.ports.user.usecase.UserUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.ValidChangeEmailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByIdUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO)
@RequiredArgsConstructor
public class TraderController extends AbstractController {

    private final UserFactoryUseCase userFactoryUseCase;
    private final UserUpdateUseCase userUpdateUseCase;
    private final ValidChangeEmailUseCase validChangeEmailUseCase;
    private final UsePushNotifUpdateUseCase userTraderPushNotifUseCase;
    private final GetStoreByUserIdUseCase getStoreByUserIdUseCase;
    private final RequestDeleteTraderUseCase requestDeleteTraderUseCase;
    private final RetractDeletedTraderUseCase retractDeletedTraderUseCase;
    private final GetUserByIdUseCase getUserByIdUseCase;
    private final UpdateUserEmailUseCase updateUserEmailUseCase;
    private final UserChangeNewEmailUseCase userChangeNewEmailUseCase;
    private final UserExpoTokensUseCase expoTokensUseCase;
    private final AcceptCommunicationUseCase acceptCommunicationUseCase;

    private final StoreMapper storeMapper;
    private final UserProMapper userMapper;
    private final DocumentMapper documentMapper;

    @Operation(summary = "Sign Up")
    @PostMapping("/register")
    public ResponseEntity<UserResponse> signUp(@RequestBody @Valid final OperatorCreationInitRequest operatorCreationInitRequest, final BindingResult result) {

        checkBindingResult(result);
        final Operator operator = userMapper.toOperatorEntity(operatorCreationInitRequest);
        userFactoryUseCase.addUser(operator);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Sign Up Parte 2 Complete Registration")
    @PutMapping("/complete-register")
    public ResponseEntity<UserResponse> signUpPart2(@RequestBody @Valid final OperatorCreationRequest userCreationRequest,
                                                    final BindingResult result,
                                                    @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        checkBindingResult(result);
        Operator operator = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        operator = userMapper.operatorToEntity(userCreationRequest, operator);
        operator = userUpdateUseCase.updateIdentityAndJob(operator, userCreationRequest.jobId);
        final UserResponse response = userMapper.toResponse(operator);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update Profile")
    @PutMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResponse> updateProfile(@RequestPart("user") @Valid final TraderUpdateRequest traderUpdateRequest,
                                                      @RequestPart(name = "justificationIdentity", required = false) final MultipartFile justificatifIdentity,
                                                      final BindingResult result, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) throws IOException {
        checkBindingResult(result);
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        user.getDocuments().setJustificationIdentity(documentMapper.toDocument(justificatifIdentity));
        Operator operator = userMapper.operatorToEntity(traderUpdateRequest, user);
        operator = userUpdateUseCase.updateProfile(traderUpdateRequest.jobId, operator);
        final UserResponse userResponse = userMapper.toResponse(operator);
        return ResponseEntity.ok(userResponse);
    }

    @Operation(summary = "Change Password")
    @PatchMapping("/update-password")
    public ResponseEntity<Void> changePassword(@RequestBody @Valid final PasswordChangeRequest passwordChange,
                                               final BindingResult result, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        checkBindingResult(result);
        userUpdateUseCase.changePassword(jwt.getSubject(), passwordChange.oldPassword, passwordChange.newPassword);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "push-notification")
    @PutMapping("/push-notification")
    public ResponseEntity<Void> pushNotification(@RequestParam(required = false, defaultValue = "false") final boolean active,
                                                 @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        userTraderPushNotifUseCase.pushNotification(Long.parseLong(jwt.getClaim("id")), active);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Get Store By User Id")
    @GetMapping("/first-store")
    public ResponseEntity<StoreDetailedWithCompanyIdResponse> getByUserId(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Long id = Long.parseLong(jwt.getClaim("id"));
        final Store store = getStoreByUserIdUseCase.getFirstStoreByUserId(id);
        final StoreDetailedWithCompanyIdResponse storeResponse = storeMapper.toDetailedWithCompanyIdResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @Operation(summary = "update Email ")
    @PatchMapping("/update-email")
    public ResponseEntity<Void> updateEmail(@RequestBody @Valid final EmailChangeRequest emailChangeRequest,
                                            final BindingResult result, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        checkBindingResult(result);
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        updateUserEmailUseCase.updateEmail(user, emailChangeRequest.oldEmail, emailChangeRequest.newEmail);
        userChangeNewEmailUseCase.sendEmailToChangeEmail(user);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Valid Update Email")
    @PatchMapping("/validate-update-email")
    public ResponseEntity<Void> validUpdateEmail(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        validChangeEmailUseCase.changeEmail(user, jwt.getClaim("key"));
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Request Delete Account")
    @PatchMapping("/request-delete-account")
    public ResponseEntity<Void> requestDeleteAccount(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        requestDeleteTraderUseCase.requestDeleteTrader(user);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Retract Deleted Account")
    @PatchMapping("/retract-delete-account")
    public ResponseEntity<Void> retractDeleteAccount(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        retractDeletedTraderUseCase.retractDeletedTrader(user);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Add expo Token")
    @PostMapping("/add-expo-token")
    public ResponseEntity<Void> addExpoToken(@RequestBody final ExpoTokenRequest expoTokenRequest,
                                             @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        expoTokensUseCase.addExpoToken(user.getId(), expoTokenRequest.expoToken);
        userTraderPushNotifUseCase.pushNotification(user.getId(), true);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Enable or Disable Communication")
    @PatchMapping("/communication")
    public ResponseEntity<Void> communication(final Boolean communication,
                                              @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Operator user = (Operator) getUserByIdUseCase.getUserById(Long.parseLong(jwt.getClaim("id")));
        acceptCommunicationUseCase.acceptCommunication(user, communication);
        return ResponseEntity.noContent().build();
    }
}
