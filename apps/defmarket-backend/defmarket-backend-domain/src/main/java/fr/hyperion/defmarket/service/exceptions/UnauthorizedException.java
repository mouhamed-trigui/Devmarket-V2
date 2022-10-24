package fr.hyperion.defmarket.service.exceptions;

public class UnauthorizedException extends RuntimeException {


    public UnauthorizedException() {
        super("Unauthorized");
    }
}
