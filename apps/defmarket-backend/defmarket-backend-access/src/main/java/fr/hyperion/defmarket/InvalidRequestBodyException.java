package fr.hyperion.defmarket;

import java.io.Serial;
import java.util.List;

import org.springframework.validation.FieldError;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InvalidRequestBodyException extends IllegalArgumentException {

    @Serial
    private static final long serialVersionUID = 8989319876194327623L;

    private final List<FieldError> validationErrors;

}
