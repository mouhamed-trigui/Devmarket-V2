package fr.hyperion.defmarket.gateway.event.notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationEventData {
	private String to;
	private String sound;
	private String title;
	private String body;
}