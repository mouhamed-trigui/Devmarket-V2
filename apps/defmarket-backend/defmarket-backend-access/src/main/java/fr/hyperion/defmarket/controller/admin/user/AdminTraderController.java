package fr.hyperion.defmarket.controller.admin.user;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import fr.hyperion.defmarket.controller.admin.user.mapper.UserAdminMapper;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.dto.request.user.BlockActionTraderRequest;
import fr.hyperion.defmarket.dto.request.user.MoreInfoRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationByAdminRequest;
import fr.hyperion.defmarket.dto.request.user.UpdateTraderRequest;
import fr.hyperion.defmarket.dto.response.user.UpdateTraderResponse;
import fr.hyperion.defmarket.dto.response.user.UserResponse;
import fr.hyperion.defmarket.dto.response.user.UserWithCompanyListResponse;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.user.usecase.AddUserByAdminUseCase;
import fr.hyperion.defmarket.ports.user.usecase.AdminUserUpdateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.SendRequestInfoMailUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderBlockActionUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderDeleteUseCase;
import fr.hyperion.defmarket.ports.user.usecase.TraderValidateUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllTradersUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetNextUserUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetTradersCountUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByIdUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.SearchUserUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/trader")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE')")
public class AdminTraderController extends AbstractController {
    private final GetAllTradersUseCase getAllTradersUseCase;

    private final AddUserByAdminUseCase addUserByAdminUseCase;
    private final TraderDeleteUseCase userDeleteUseCase;
    private final AdminUserUpdateUseCase adminUserUpdateUseCase;
    private final GetUserByIdUseCase getUserByIdUseCase;
    private final UserAdminMapper userMapper;
    private final DocumentMapper documentMapper;
    private final TraderValidateUseCase traderValidateUseCase;
    private final TraderBlockActionUseCase traderBlockUseCase;
    private final SendRequestInfoMailUseCase sendRequestInfoMailUseCase;
    private final GetNextUserUseCase getNextUserUseCase;
    private final GetTradersCountUseCase getTradersCountUseCase;
    private final SearchUserUseCase searchUserUseCase;

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_CREATE')")
    @Operation(summary = "Sign Up")
    @PostMapping("/register")
    public ResponseEntity<UserResponse> signUp(@RequestBody @Valid final OperatorCreationByAdminRequest operatorCreationByAdminRequest, final BindingResult result) {
        checkBindingResult(result);
        Operator operator = userMapper.operatorToEntity(operatorCreationByAdminRequest);
        operator = addUserByAdminUseCase.addUserByAdmin(operator, operatorCreationByAdminRequest.jobId);
        final UserResponse userResponse = userMapper.toResponse(operator);
        return ResponseEntity.ok(userResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = "Get All Traders")
    @GetMapping
    public ResponseEntity<Page<UserWithCompanyListResponse>> getAllTraders(final UserFilter userFilter,
                                                                           final Pageable pageable) {
        final Page<OperatorWithCompanies> allDefmarketUsers = getAllTradersUseCase.getAllTraders(pageable, userFilter);
        final Page<UserWithCompanyListResponse> userResponses = allDefmarketUsers.map(userMapper::toResponse);
        return ResponseEntity.ok(userResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = " Get the count of user  can be validated")
    @GetMapping("/count")
    public ResponseEntity<Long> getCount(final UserFilter userFilter) {
        final Long tradersCount = getTradersCountUseCase.getTradersCount(userFilter, UserTypeEnum.TRADER);
        return ResponseEntity.ok(tradersCount);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = "Get next user to validate")
    @GetMapping("/{currentUserId}/next")
    public ResponseEntity<UserWithCompanyListResponse> getNextUser(@PathVariable final Long currentUserId, @RequestParam(required = false) final Boolean moreInfoRequestedByAdmin) {
        final UserFilter filter = new UserFilter(false, false, true, moreInfoRequestedByAdmin);
        final OperatorWithCompanies nextUser = getNextUserUseCase.getNextUser(currentUserId, filter, false,
            UserTypeEnum.TRADER);
        final UserWithCompanyListResponse userResponse = userMapper.toResponse(nextUser);
        return ResponseEntity.ok(userResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = "Get previous user to validate")
    @GetMapping("/{currentUserId}/previous")
    public ResponseEntity<UserWithCompanyListResponse> getPreviousUser(@PathVariable final Long currentUserId, @RequestParam(required = false) final Boolean moreInfoRequestedByAdmin) {
        final UserFilter filter = new UserFilter(false, false, true, moreInfoRequestedByAdmin);
        final OperatorWithCompanies nextUser = getNextUserUseCase.getNextUser(currentUserId, filter, true,
            UserTypeEnum.TRADER);
        final UserWithCompanyListResponse userResponse = userMapper.toResponse(nextUser);
        return ResponseEntity.ok(userResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = "Get Trader by Id")
    @GetMapping("/{traderId}")
    public ResponseEntity<UserWithCompanyListResponse> getById(@PathVariable final Long traderId) {
        final Operator operator = (Operator) getUserByIdUseCase.getUserById(traderId);
        final UserWithCompanyListResponse userResponse = userMapper.toResponse((OperatorWithCompanies) operator);
        return ResponseEntity.ok(userResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_UPDATE')")
    @Operation(summary = "Validate Trader By Id")
    @PatchMapping("/{traderId}/validate-user")
    public ResponseEntity<Void> validateTraderById(@PathVariable final Long traderId) {
        traderValidateUseCase.validateTrader(traderId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_UPDATE')")
    @Operation(summary = "Validate Trader info By Id")
    @PatchMapping("/{traderId}/validate-info")
    public ResponseEntity<Void> validateTraderInfoById(@PathVariable final Long traderId) {
        traderValidateUseCase.validateTraderInfo(traderId);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Request more information sending a mail to user ")
    @PostMapping("/{traderId}/request-more-info")
    public ResponseEntity<Void> sendRequestInfoMail(@PathVariable final Long traderId, @RequestBody @Valid final MoreInfoRequest moreInfoRequest) {
        sendRequestInfoMailUseCase.sendRequestInfoMail(traderId, moreInfoRequest.subject, moreInfoRequest.message);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_UPDATE')")
    @Operation(summary = "Block/DeBlock Trader By Id")
    @PatchMapping("/{traderId}/block-action")
    public ResponseEntity<Void> blockActionUserById(@PathVariable final Long traderId, @RequestBody @Valid final BlockActionTraderRequest blockActionTraderRequest) {
        traderBlockUseCase.blockActionTrader(traderId, blockActionTraderRequest.blockAction, blockActionTraderRequest.reason);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_DELETE')")
    @Operation(summary = "Delete Trader")
    @DeleteMapping("/{traderId}/delete")
    public ResponseEntity<Void> deleteTrader(@PathVariable final Long traderId) {
        userDeleteUseCase.deleteTrader(traderId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_UPDATE')")
    @Operation(summary = "update Trader Details")
    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, value = ("/{traderId}/update-trader"))
    public ResponseEntity<UpdateTraderResponse> updateTraders(@RequestPart("user") @Valid final UpdateTraderRequest updateTraderRequest, @PathVariable final Long traderId,
                                                              @RequestPart(name = "justificationVeteran", required = false) final MultipartFile justificationVeteran,
                                                              @RequestPart(name = "justificationIdentity", required = false) final MultipartFile justificationIdentity,
                                                              final BindingResult result) throws IOException {
        checkBindingResult(result);
        Operator operator = (Operator) getUserByIdUseCase.getUserById(traderId);
        operator = userMapper.traderToEntity(updateTraderRequest, operator);
        operator.getDocuments().setJustificationVeteran(documentMapper.toDocument(justificationVeteran));
        operator.getDocuments().setJustificationIdentity(documentMapper.toDocument(justificationIdentity));
        operator = adminUserUpdateUseCase.updateIdentity(operator, updateTraderRequest.jobId, updateTraderRequest.password);
        final UpdateTraderResponse response = userMapper.toTraderResponse(operator);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_PROFILE_READ')")
    @Operation(summary = "Search User By First or last Name or email")
    @GetMapping("/search")
    public ResponseEntity<Page<UserResponse>> getUserByNameOrEmail(final Pageable pageable,
                                                                   @RequestParam(required = false) final String input) {
        final Page<UserAccount> result = searchUserUseCase.searchByDetails(pageable, input, UserTypeEnum.TRADER);
        final Page<UserResponse> userResponses = result.map(userAccount -> userMapper.toResponse((Operator) userAccount));
        return ResponseEntity.ok(userResponses);
    }
}
