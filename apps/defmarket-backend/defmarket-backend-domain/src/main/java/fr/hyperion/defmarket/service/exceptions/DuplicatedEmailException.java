package fr.hyperion.defmarket.service.exceptions;

public class DuplicatedEmailException extends RuntimeException {
    public DuplicatedEmailException(final String message) {
        super(message);
    }

    public DuplicatedEmailException() {
        super("This Email already exist. Plz choose another one ");
    }


}
