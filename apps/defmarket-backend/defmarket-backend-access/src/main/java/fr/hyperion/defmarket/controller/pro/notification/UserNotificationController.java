package fr.hyperion.defmarket.controller.pro.notification;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.notification.Mapper.NotificationMapper;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.dto.response.user.notification.UserNotificationResponse;
import fr.hyperion.defmarket.ports.notification.useCase.DeleteNotificationUseCase;
import fr.hyperion.defmarket.ports.notification.useCase.getters.GetAllNotificationByOwerIdUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/notifications")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_NOTIFICATION')")
public class UserNotificationController extends AbstractController {

    private final GetAllNotificationByOwerIdUseCase getAllNotificationByIdUseCase;
    private final DeleteNotificationUseCase deleteNotificationUseCase;
    private final NotificationMapper userNotificationMapper;

    @PreAuthorize("hasAuthority('PERM_NOTIFICATION_READ')")
    @Operation(summary = "Get All Notification ")
    @GetMapping
    public ResponseEntity<Page<UserNotificationResponse>> getAll(final Pageable pageable,
                                                                 @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {

        final Page<UserNotification> allNotifs = getAllNotificationByIdUseCase.getAllByOwnerId(Long.parseLong(jwt.getClaim("id")), pageable);
        final Page<UserNotificationResponse> notifresponces = allNotifs.map(userNotificationMapper::toResponse);
        return ResponseEntity.ok(notifresponces);
    }


    @PreAuthorize("hasAuthority('PERM_NOTIFICATION_DELETE')")
    @Operation(summary = "Delete Notification By Id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        deleteNotificationUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

}
