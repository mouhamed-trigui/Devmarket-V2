package fr.hyperion.defmarket.service.exceptions;

import java.io.Serial;

public class NotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 4940210181738526488L;

    public NotFoundException(final String element, final Long id) {
        super(String.format("The specified %s with id=%d does not exist", element, id));
    }

    public NotFoundException(final String element) {
        super(String.format("The searched %s can't be found", element));
    }
}
