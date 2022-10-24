package fr.hyperion.defmarket.gateway.event.notification;

import fr.hyperion.defmarket.gateway.notification.internal.model.ExpoExceptionsEnum;
import lombok.Getter;

@Getter
public class NotificationEventException extends RuntimeException {

	private static final long serialVersionUID = -5430883163438925591L;
	
	private final ExpoExceptionsEnum exceptionsEnum;

	public NotificationEventException(ExpoExceptionsEnum exceptionsEnum,String message) {
		super(message);
		this.exceptionsEnum = exceptionsEnum;
	}

}
