package fr.hyperion.defmarket.adapters.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.notification.mapper.NotificationDBMapper;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.entity.UserNotificationDB;
import fr.hyperion.defmarket.database.repository.UserNotificationRepository;
import fr.hyperion.defmarket.database.repository.UserRepository;
import fr.hyperion.defmarket.database.specification.UserNotificationSpecification;
import fr.hyperion.defmarket.ports.notification.persistence.CreateNotificationtAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.DeleteNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllNotificationByOwnerIdAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserNotificationAdapter implements CreateNotificationtAdapter, GetAllNotificationByOwnerIdAdapter, DeleteNotificationAdapter, GetAllNotificationAdapter {

    private final UserNotificationRepository userNotificationRepository;
    private final NotificationDBMapper notificationDBMapper;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserNotification create(final UserNotification userNotification, final Long ownerId) {
        UserNotificationDB userNotificationDB = notificationDBMapper.toEntity(userNotification);
        final UserAccountDB userAccountDB = userRepository.findById(ownerId).orElseThrow();
        userNotificationDB.setOwner(userAccountDB);
        userNotificationDB = userNotificationRepository.save(userNotificationDB);
        return notificationDBMapper.toData(userNotificationDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserNotification> getByOwnerId(final Long ownerId, final Pageable pageable) {
        final Specification<UserNotificationDB> spec = Specification.where(UserNotificationSpecification.getByOwnerId(ownerId))
            .and(UserNotificationSpecification.notDeleted());

        final Page<UserNotificationDB> allNotifs = userNotificationRepository.findAll(spec, pageable);
        return allNotifs.map(notificationDBMapper::toData);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserNotification> getAllNotification(final Pageable pageable) {
        final Specification<UserNotificationDB> spec = Specification.where(UserNotificationSpecification.notDeleted());
        final Page<UserNotificationDB> allNotifs = userNotificationRepository.findAll(spec, pageable);
        return allNotifs.map(notificationDBMapper::toData);
    }

    @Override
    @Transactional
    public UserNotification delete(final Long id) {
        final UserNotificationDB notificationDB = userNotificationRepository.findById(id).orElseThrow();
        notificationDB.setDeleted(true);
        return notificationDBMapper.toData(notificationDB);
    }

}
