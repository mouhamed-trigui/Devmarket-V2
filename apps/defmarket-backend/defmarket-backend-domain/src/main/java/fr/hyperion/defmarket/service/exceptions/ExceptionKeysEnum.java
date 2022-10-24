package fr.hyperion.defmarket.service.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExceptionKeysEnum {

    ERROR_REQUEST_NOT_VALID("error.request.not-valid"), ERROR_REQUEST_NOT_VALID_SIREN("error.request.not-valid.siren"),
    ERROR_REQUEST_DUPLICATED_EMAIL("error.request.duplicated.email"), ERROR_REQUEST_WEB_CLIENT("error.request.web.client"),
    ERROR_ENTITY_NOT_FOUND("error.entity.not-found"),
    ERROR_ENTITY_CONFLICT("error.entity.conflict"), INTERNAL_SERVER_ERROR("error.server.internal"),
    ERROR_SECURITY_UNAUTHORIZED_USER("error.security.unauthorized"), ERROR_SECURITY_INVALID_EMAIL("error.security" +
        ".invalid.email"),
    ERROR_REQUEST_NOT_VALID_OFFER_VALUE("error.request.not-valid.offer-value"),

    ERROR_REQUEST_NOT_VALID_REDIRECTION("error.request.not-valid.redirection"),
    ERROR_SECURITY_ACCESS_DENIED("error.security.forbidden"),
    ERROR_REQUEST_FILE_NOT_VALID("error.request.file-not-valid"),
    ERROR_NOT_VALID_FRONT_VERSION_VALUE("error.front-version-not-valid");

    private final String key;

}
