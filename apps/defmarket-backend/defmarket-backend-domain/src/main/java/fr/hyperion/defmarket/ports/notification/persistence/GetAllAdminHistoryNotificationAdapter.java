package fr.hyperion.defmarket.ports.notification.persistence;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;

public interface GetAllAdminHistoryNotificationAdapter {
    Page<AdminHistoryNotification> getAllNotification(Pageable pageable);
}
