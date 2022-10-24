package fr.hyperion.defmarket.ports.notification.useCase.getters;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.notification.UserNotification;

public interface GetAllNotificationByOwerIdUseCase {
    Page<UserNotification> getAllByOwnerId(Long ownerId, Pageable pageable);

}
