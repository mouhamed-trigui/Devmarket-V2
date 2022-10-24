package fr.hyperion.defmarket.service.notification;


import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.data.notification.UserNotification;
import fr.hyperion.defmarket.data.user.ExpoToken;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifStatusEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTypeEnum;
import fr.hyperion.defmarket.ports.company.event.NotificationData;
import fr.hyperion.defmarket.ports.company.event.NotificationEventPort;
import fr.hyperion.defmarket.ports.notification.persistence.CreateAdminHistoryNotificationtAdapter;
import fr.hyperion.defmarket.ports.notification.persistence.GetAllAdminHistoryNotificationAdapter;
import fr.hyperion.defmarket.ports.notification.useCase.CreateNotificationUseCase;
import fr.hyperion.defmarket.ports.notification.useCase.getters.GetAllAdminHistoryNotificationUseCase;
import fr.hyperion.defmarket.ports.user.persistence.GetAllTradersForNotificationAdapter;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import fr.hyperion.defmarket.utilitary.event.CreateInternalNotificationEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class AdminNotificationServiceImpl implements CreateNotificationUseCase, GetAllAdminHistoryNotificationUseCase {

    private static final String sound = "default";
    private final NotificationEventPort notificationEventPort;
    private final GetAllTradersForNotificationAdapter getAllTradersByAddressAdapter;
    private final GetAllAdminHistoryNotificationAdapter getAllAdminHistoryNotificationAdapter;
    private final CreateAdminHistoryNotificationtAdapter createAdminHistoryNotificationtAdapter;
    private final DateAndTimeUseCase dateAndTimeUseCase;
    private final EventPublisher eventPublisher;


    @Override
    public void create(final AdminHistoryNotification notification, final Long storeCategoryId) {
        final List<Operator> allTrader = getAllTradersByAddressAdapter.getAllTradersForNotification(notification.getAddressList(), notification.getStoreType(), storeCategoryId);

        if (allTrader.isEmpty()) {
            notification.setTotalTradersNumber(0L);
            notification.setIconType(IconTypeEnum.WELCOME);
            notification.setStatus(NotifStatusEnum.FAILED);
            createAdminHistoryNotificationtAdapter.create(notification, storeCategoryId);
            log.info("Admin History notification has been created");

        } else {

            notification.setTotalTradersNumber((long) allTrader.size());
            notification.setIconType(IconTypeEnum.WELCOME);
            notification.setStatus(NotifStatusEnum.SUCCESS);
            createAdminHistoryNotificationtAdapter.create(notification, storeCategoryId);
            log.info("Admin History notification has been created");


            for (final Operator operator : allTrader) {
                if ((notification.getNotificationType() == NotifTypeEnum.PUSH) && operator.isPushNotificationActive()) {
                    final Set<ExpoToken> expoTokens = operator.getExpoTokens();
                    for (final ExpoToken expo : expoTokens) {
                        if (expo.isActive()) {
                            final NotificationData notificationData = new NotificationData(expo.getExpoToken(), sound, notification.getTitle(), notification.getMessage());
                            notificationEventPort.publishEvent(notificationData, operator);
                        }

                    }
                }
                if (notification.getNotificationType() == NotifTypeEnum.INTERNAL) {
                    final UserNotification userNotification = new UserNotification(notification.getId(), notification.getMessage(), notification.getTitle(), notification.getIconType(), null, notification.getCreatedDate());
                    final CreateInternalNotificationEvent createInternalNotificationEvent = new CreateInternalNotificationEvent(userNotification, operator.getId()
                        , this, dateAndTimeUseCase.nowUTC());
                    eventPublisher.publishEvent(createInternalNotificationEvent);
                    log.info("{} notification has been created for userId {}", notification.getTitle(), operator.getId());
                }
            }
        }
    }

    @Override
    public Page<AdminHistoryNotification> getAll(final Pageable pageable) {
        return getAllAdminHistoryNotificationAdapter.getAllNotification(pageable);
    }

}
