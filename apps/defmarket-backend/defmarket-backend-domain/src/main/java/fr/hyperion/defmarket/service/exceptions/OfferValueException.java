package fr.hyperion.defmarket.service.exceptions;

public class OfferValueException extends RuntimeException {
    public OfferValueException(final String message) {
        super(message);
    }

    public OfferValueException() {
        super("invalid value");
    }


}
