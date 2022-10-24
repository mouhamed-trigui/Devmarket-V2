package fr.hyperion.defmarket.service.exceptions;

public class VersionCheckException extends RuntimeException {
    public VersionCheckException() {
        super("Version update is needed");
    }


}
