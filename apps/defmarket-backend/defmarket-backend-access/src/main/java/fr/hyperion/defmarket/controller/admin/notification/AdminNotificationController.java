package fr.hyperion.defmarket.controller.admin.notification;


import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.admin.notification.Mapper.NotificationAdminMapper;
import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.dto.request.user.notification.AdminNotificationRequest;
import fr.hyperion.defmarket.dto.response.historytrace.AdminHistoryNotificationResponse;
import fr.hyperion.defmarket.ports.notification.useCase.CreateNotificationUseCase;
import fr.hyperion.defmarket.ports.notification.useCase.getters.GetAllAdminHistoryNotificationUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/notification")
@RequiredArgsConstructor
public class AdminNotificationController extends AbstractController {

    private final CreateNotificationUseCase createNotificationUseCase;
    private final GetAllAdminHistoryNotificationUseCase getAllAdminHistoryNotificationUseCase;
    private final NotificationAdminMapper userNotificationMapper;


    @Operation(summary = "Create Notification")
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody @Valid final AdminNotificationRequest userNotificationRequest, final BindingResult result) {
        checkBindingResult(result);
        final AdminHistoryNotification adminHistoryNotification = userNotificationMapper.toEntity(userNotificationRequest);
        createNotificationUseCase.create(adminHistoryNotification, userNotificationRequest.storeCategoryId);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Get All Notification ")
    @GetMapping
    public ResponseEntity<Page<AdminHistoryNotificationResponse>> getAll(final Pageable pageable) {
        final Page<AdminHistoryNotification> allNotifs = getAllAdminHistoryNotificationUseCase.getAll(pageable);
        final Page<AdminHistoryNotificationResponse> notifresponces = allNotifs.map(userNotificationMapper::toResponse);
        return ResponseEntity.ok(notifresponces);
    }

}

