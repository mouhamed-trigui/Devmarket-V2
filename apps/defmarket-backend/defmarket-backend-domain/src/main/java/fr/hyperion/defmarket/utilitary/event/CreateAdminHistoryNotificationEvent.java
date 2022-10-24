package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.notification.AdminHistoryNotification;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateAdminHistoryNotificationEvent implements CustomEvent {

    private AdminHistoryNotification adminHistoryNotification;
    private Long storeCategoryId;
    private NotifStatusEnum status;
    private IconTypeEnum iconType;
    private Object source;
    private Instant timestamp;
}
