package fr.hyperion.defmarket.adapters.notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.notification.mapper.NotificationDBMapper;
import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.database.entity.AdminHistoryNotificationDB;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB;
import fr.hyperion.defmarket.database.repository.AdminHistoryNotificationRepository;
import fr.hyperion.defmarket.database.repository.StoreCategoryRepository;
import fr.hyperion.defmarket.database.specification.AdminHistoryNotificationSpecification;
import fr.hyperion.defmarket.ports.notification.persistence.CreateAdminHistoryNotificationtAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.DeleteAdminHistoryNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllAdminHistoryNotificationAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminHistoryNotificationAdapter implements CreateAdminHistoryNotificationtAdapter, DeleteAdminHistoryNotificationAdapter, GetAllAdminHistoryNotificationAdapter {

    private final AdminHistoryNotificationRepository adminHistoryNotificationRepository;
    private final NotificationDBMapper notificationDBMapper;
    private final StoreCategoryRepository storeCategoryRepository;

    @Override
    @Transactional
    public AdminHistoryNotification create(final AdminHistoryNotification adminHistoryNotification, final Long storeCategoryId) {
        AdminHistoryNotificationDB adminHistoryNotificationDB = notificationDBMapper.toEntity(adminHistoryNotification);
        if (storeCategoryId != null) {
            final StoreCategoryDB storeCategoryDB = storeCategoryRepository.findById(storeCategoryId).orElseThrow();
            adminHistoryNotificationDB.setStoreCategory(storeCategoryDB);
        }
        adminHistoryNotificationDB = adminHistoryNotificationRepository.save(adminHistoryNotificationDB);
        return notificationDBMapper.toData(adminHistoryNotificationDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdminHistoryNotification> getAllNotification(final Pageable pageable) {
        final Specification<AdminHistoryNotificationDB> spec = Specification.where(AdminHistoryNotificationSpecification.notDeleted());
        final Page<AdminHistoryNotificationDB> allNotifs = adminHistoryNotificationRepository.findAll(spec, pageable);
        return allNotifs.map(notificationDBMapper::toData);

    }

    @Override
    @Transactional
    public AdminHistoryNotification delete(final Long id) {
        final AdminHistoryNotificationDB adminHistoryNotificationDB = adminHistoryNotificationRepository.findById(id).orElseThrow();
        adminHistoryNotificationDB.setDeleted(true);
        return notificationDBMapper.toData(adminHistoryNotificationDB);
    }
}
