package fr.hyperion.defmarket.ports.notification.persistence;


import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;

public interface CreateAdminHistoryNotificationtAdapter {
    AdminHistoryNotification create(AdminHistoryNotification adminHistoryNotification, Long storeCategoryId);
}
