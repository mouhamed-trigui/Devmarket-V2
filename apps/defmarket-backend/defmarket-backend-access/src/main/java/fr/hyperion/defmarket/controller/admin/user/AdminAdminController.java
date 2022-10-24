package fr.hyperion.defmarket.controller.admin.user;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.admin.user.mapper.UserAdminMapper;
import fr.hyperion.defmarket.data.user.Admin;
import fr.hyperion.defmarket.dto.request.user.AdminCreationRequest;
import fr.hyperion.defmarket.dto.response.user.UserBasicResponse;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.user.usecase.AddUserByAdminUseCase;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_ADMIN_ADMIN')")
public class AdminAdminController extends AbstractController {
    private final UserAdminMapper userMapper;
    private final AddUserByAdminUseCase addUserByAdminUseCase;

    @PreAuthorize("hasAuthority('PERM_ADMIN_ADMIN_CREATE')")
    @PostMapping()
    public ResponseEntity<UserBasicResponse> addAdmin(@RequestBody @Valid final AdminCreationRequest adminCreationRequest, final BindingResult result) {
        checkBindingResult(result);
        Admin admin = userMapper.toAdminEntity(adminCreationRequest);
        admin = (Admin) addUserByAdminUseCase.addUserByAdmin(admin, UserTypeEnum.ADMIN);
        final UserBasicResponse userResponse = userMapper.toResponse(admin);
        return ResponseEntity.ok(userResponse);
    }
}
