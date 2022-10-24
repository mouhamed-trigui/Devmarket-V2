package fr.hyperion.defmarket.service.exceptions;

import java.io.Serial;

public class RedirectionException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 5139059137220938191L;

    public RedirectionException(final String message) {
        super(message);
    }
}
