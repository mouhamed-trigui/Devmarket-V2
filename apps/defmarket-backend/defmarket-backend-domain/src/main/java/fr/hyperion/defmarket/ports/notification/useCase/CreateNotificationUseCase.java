package fr.hyperion.defmarket.ports.notification.useCase;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;

public interface CreateNotificationUseCase {
    void create(AdminHistoryNotification notification, Long storeCategoryId);
}
