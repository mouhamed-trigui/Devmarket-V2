package fr.hyperion.defmarket.gateway.notification.internal.model;

import java.util.Map;

import org.springframework.context.ApplicationEvent;

import lombok.Getter;

@Getter
public class NotificationEvent extends ApplicationEvent {

	private static final long serialVersionUID = -1475414018074904209L;
	
	private final Map<String,String> data;

	public NotificationEvent(Map<String,String> data) {
		super(data);
		this.data = data;
	}
}