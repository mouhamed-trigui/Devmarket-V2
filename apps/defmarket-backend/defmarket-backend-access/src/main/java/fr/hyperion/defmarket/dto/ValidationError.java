package fr.hyperion.defmarket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ValidationError {

	@NonNull
	private String message;

	@NonNull
	private String field;
}
