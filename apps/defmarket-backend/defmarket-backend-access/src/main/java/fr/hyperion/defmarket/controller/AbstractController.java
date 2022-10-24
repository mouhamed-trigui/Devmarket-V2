package fr.hyperion.defmarket.controller;

import org.springframework.validation.BindingResult;

import fr.hyperion.defmarket.InvalidRequestBodyException;

public abstract class AbstractController {

    public static final String APP_PREFIX = "/api";
    public static final String APP_PREFIX_PRO = "/api/pro";
    public static final String APP_PREFIX_ADMIN = "/api/admin";
    public static final String APP_PREFIX_CUSTOMER = "/api/customer";

    protected void checkBindingResult(final BindingResult result) {
        if(result.hasErrors()) {
            throw new InvalidRequestBodyException(result.getFieldErrors());
        }
    }
}
