package fr.hyperion.defmarket.ports.notification.useCase.getters;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;

public interface GetAllAdminHistoryNotificationUseCase {
    Page<AdminHistoryNotification> getAll(Pageable pageable);

}
