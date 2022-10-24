package fr.hyperion.defmarket.ports.notification.persistence;


import fr.hyperion.defmarket.data.notification.UserNotification;

public interface DeleteNotificationAdapter {
    UserNotification delete(Long id);
}
