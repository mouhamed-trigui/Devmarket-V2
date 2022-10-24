package fr.hyperion.defmarket.ports.notification.persistence;


import fr.hyperion.defmarket.data.notification.UserNotification;

public interface CreateNotificationtAdapter {
    UserNotification create(UserNotification notification, Long ownerId);
}
