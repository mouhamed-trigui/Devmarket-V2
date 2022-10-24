package fr.hyperion.defmarket.gateway.event.notification.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import fr.hyperion.defmarket.gateway.event.notification.NotificationEventData;
import fr.hyperion.defmarket.ports.company.event.NotificationData;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface NotificationEventDataMapper {
	
	NotificationEventData toNotificationEventData(NotificationData notificationData);

}
