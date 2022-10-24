package fr.hyperion.defmarket.gateway.event.mail;

import lombok.Data;

@Data
public class EmailEventData {
	
	private String subject;

	private String message;

	private String to;
}
