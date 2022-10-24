package fr.hyperion.defmarket.service.notification;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.ports.notification.persistence.DeleteNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllNotificationByOwnerIdAdapter;
import fr.hyperion.defmarket.ports.notification.useCase.DeleteNotificationUseCase;
import fr.hyperion.defmarket.ports.notification.useCase.getters.GetAllNotificationByOwerIdUseCase;
import fr.hyperion.defmarket.ports.notification.useCase.getters.GetAllNotificationUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserNotificationServiceImpl implements GetAllNotificationByOwerIdUseCase, DeleteNotificationUseCase, GetAllNotificationUseCase {

    private final GetAllNotificationByOwnerIdAdapter getAllNotificationByOwnerIdAdapter;
    private final GetAllNotificationAdapter getAllNotificationAdapter;
    private final DeleteNotificationAdapter deleteNotificationAdapter;


    @Override
    public Page<UserNotification> getAllByOwnerId(final Long ownerId, final Pageable pageable) {
        return getAllNotificationByOwnerIdAdapter.getByOwnerId(ownerId, pageable);
    }

    @Override
    public Page<UserNotification> getAll(final Pageable pageable) {
        return getAllNotificationAdapter.getAllNotification(pageable);
    }

    @Override
    public UserNotification delete(final Long id) {
        return deleteNotificationAdapter.delete(id);
    }

}
