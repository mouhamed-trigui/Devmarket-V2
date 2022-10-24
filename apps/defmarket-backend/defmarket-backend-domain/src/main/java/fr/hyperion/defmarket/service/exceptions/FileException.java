package fr.hyperion.defmarket.service.exceptions;

public class FileException extends RuntimeException {
    public FileException() {
        super("Invalid File");
    }

    public FileException(final Throwable cause) {
        super(cause);
    }

    public FileException(final String message) {
        super(message);
    }

    public FileException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
