package fr.hyperion.defmarket.ports.notification.persistence;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.notification.UserNotification;

public interface GetAllNotificationAdapter {
    Page<UserNotification> getAllNotification(Pageable pageable);
}
