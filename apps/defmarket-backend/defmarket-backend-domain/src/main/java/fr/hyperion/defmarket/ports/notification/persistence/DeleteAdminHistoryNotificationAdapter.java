package fr.hyperion.defmarket.ports.notification.persistence;


import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;

public interface DeleteAdminHistoryNotificationAdapter {
    AdminHistoryNotification delete(Long id);
}
