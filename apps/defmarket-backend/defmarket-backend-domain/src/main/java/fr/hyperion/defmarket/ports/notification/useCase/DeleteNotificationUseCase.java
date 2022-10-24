package fr.hyperion.defmarket.ports.notification.useCase;

import fr.hyperion.defmarket.data.notification.UserNotification;

public interface DeleteNotificationUseCase {
    UserNotification delete(Long id);
}
