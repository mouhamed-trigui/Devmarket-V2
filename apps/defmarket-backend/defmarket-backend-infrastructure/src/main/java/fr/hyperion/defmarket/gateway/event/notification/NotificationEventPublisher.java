package fr.hyperion.defmarket.gateway.event.notification;

import java.util.Map;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.gateway.event.notification.mapper.NotificationEventDataMapper;
import fr.hyperion.defmarket.gateway.notification.internal.model.ExpoExceptionsEnum;
import fr.hyperion.defmarket.gateway.notification.internal.model.NotificationEvent;
import fr.hyperion.defmarket.ports.company.event.NotificationData;
import fr.hyperion.defmarket.ports.company.event.NotificationEventPort;
import fr.hyperion.defmarket.ports.user.persistence.DeleteExpoTokenAdapter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class NotificationEventPublisher implements NotificationEventPort {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final DeleteExpoTokenAdapter deleteExpoTokenAdapter;
    private final ObjectMapper objectMapper;
	private final NotificationEventDataMapper notificationEventDataMapper;

	@Override
    public void publishEvent(final NotificationData notificationData, final DefmarketUser defmarketUser) {
		final NotificationEventData notificationEventData = notificationEventDataMapper
				.toNotificationEventData(notificationData);
		try {
			@SuppressWarnings("unchecked") final Map<String, String> request = objectMapper.convertValue(notificationEventData, Map.class);
			log.info("{}", request);
			applicationEventPublisher.publishEvent(new NotificationEvent(request));
		} catch (final NotificationEventException e) {
			expoNotificationError(defmarketUser, e.getExceptionsEnum(), notificationEventData);
			log.error("{}", e.getMessage());
		}
	}

	private void expoNotificationError(final DefmarketUser defmarketUser, final ExpoExceptionsEnum errorResponse,
                                       final NotificationEventData notificationEventData) {
		if (errorResponse.equals(ExpoExceptionsEnum.DEVICE_NOT_REGISTRED)) {
            deleteExpoTokenAdapter.deleteExpoToken(defmarketUser.getId(), notificationEventData.getTo());
		}
	}
}
