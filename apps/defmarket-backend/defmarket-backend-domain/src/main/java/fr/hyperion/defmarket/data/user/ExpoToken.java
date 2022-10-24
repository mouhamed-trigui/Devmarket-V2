package fr.hyperion.defmarket.data.user;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpoToken {

	private String expoToken;
	
	private Instant lastCheck;
	
	private boolean active;

}
