package fr.hyperion.defmarket.service.exceptions;

public class DuplicatedSirenException extends RuntimeException {
    public DuplicatedSirenException(final String message) {
        super(message);
    }

    public DuplicatedSirenException() {
        super("This Siren is already in used");
    }


}
