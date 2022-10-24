package fr.hyperion.defmarket.database.cryptoconverter;

import lombok.Getter;

@Getter
public class ConverterException extends RuntimeException {
    public ConverterException(final String message) {
        super(message);
    }

}
