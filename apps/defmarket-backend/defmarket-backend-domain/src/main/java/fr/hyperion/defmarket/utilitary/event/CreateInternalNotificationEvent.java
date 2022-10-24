package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.notification.UserNotification;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateInternalNotificationEvent implements CustomEvent {

    private UserNotification userNotification;
    private Long ownerId;
    private Object source;
    private Instant timestamp;
}
