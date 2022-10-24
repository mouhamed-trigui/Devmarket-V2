package fr.hyperion.defmarket.gateway.notification.internal.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public enum ExpoExceptionsEnum {
	@JsonProperty("DeviceNotRegistered")
	DEVICE_NOT_REGISTRED("DeviceNotRegistered"),
	@JsonProperty("MessageTooBig")
	MESSAGE_TO_BIG("MessageTooBig"),
	@JsonProperty("MismatchSenderId")
	MISMATCH_SENDER_ID("MismatchSenderId"),
	@JsonProperty("InvalidCredentials")
	INVALID_CREDENTIALS("InvalidCredentials");
	
	private final String stringValue;

	ExpoExceptionsEnum(String value) {
        stringValue = value;
    }
}
