package fr.hyperion.defmarket.ports.notification.persistence;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.notification.UserNotification;

public interface GetAllNotificationByOwnerIdAdapter {
    Page<UserNotification> getByOwnerId(Long ownerId, Pageable pageable);
}
