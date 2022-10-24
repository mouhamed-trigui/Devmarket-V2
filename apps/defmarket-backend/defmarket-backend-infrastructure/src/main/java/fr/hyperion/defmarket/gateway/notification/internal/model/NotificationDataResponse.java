package fr.hyperion.defmarket.gateway.notification.internal.model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class NotificationDataResponse {

	String id;
	String status;
	String message;
	DetailsResponse details;
}

