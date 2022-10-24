package fr.hyperion.defmarket;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import fr.hyperion.defmarket.dto.ValidationError;
import fr.hyperion.defmarket.dto.response.user.ErrorInformationResponse;
import fr.hyperion.defmarket.service.exceptions.ConflictException;
import fr.hyperion.defmarket.service.exceptions.CyclicalTreeStructureException;
import fr.hyperion.defmarket.service.exceptions.DuplicatedEmailException;
import fr.hyperion.defmarket.service.exceptions.DuplicatedSirenException;
import fr.hyperion.defmarket.service.exceptions.ExceptionKeysEnum;
import fr.hyperion.defmarket.service.exceptions.FileException;
import fr.hyperion.defmarket.service.exceptions.InvalidEmailException;
import fr.hyperion.defmarket.service.exceptions.NotFoundException;
import fr.hyperion.defmarket.service.exceptions.OfferValueException;
import fr.hyperion.defmarket.service.exceptions.RedirectionException;
import fr.hyperion.defmarket.service.exceptions.UnauthorizedException;
import fr.hyperion.defmarket.service.exceptions.VersionCheckException;
import fr.hyperion.defmarket.service.exceptions.WebClientException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@AllArgsConstructor
@ControllerAdvice
public class ExceptionHandlingController extends ResponseEntityExceptionHandler {

    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(value = ConflictException.class)
    public ErrorInformationResponse alreadyExist(final ConflictException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_ENTITY_CONFLICT.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = NotFoundException.class)
    public ErrorInformationResponse notFound(final NotFoundException e) {
        log.error(e.getMessage(), e);
        final ErrorInformationResponse errorInformationResponse =
            new ErrorInformationResponse(ExceptionKeysEnum.ERROR_ENTITY_NOT_FOUND.getKey());
        errorInformationResponse.setMessageDetails(e.getMessage());
        return errorInformationResponse;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(value = NoSuchElementException.class)
    public ErrorInformationResponse notFound(final NoSuchElementException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_ENTITY_NOT_FOUND.getKey());
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.LOOP_DETECTED)
    @ExceptionHandler(CyclicalTreeStructureException.class)
    public final ErrorInformationResponse handleAllExceptions(final CyclicalTreeStructureException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_ENTITY_CONFLICT.getKey());
    }

    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException e, final HttpHeaders headers,
                                                               final HttpStatus status, final WebRequest request) {
        log.error(e.getMessage(), e);
        final List<ValidationError> validationErrorList = new ArrayList<>();
        final BindingResult bindingResult = e.getBindingResult();
        bindingResult.getAllErrors().forEach(error -> {
            if (error instanceof FieldError fieldError) {
                final ValidationError validationError = new ValidationError(Objects.requireNonNull(fieldError.getDefaultMessage()), fieldError.getField());
                validationErrorList.add(validationError);
            } else {

                final String fields = Arrays.stream(error.getArguments()).map(o -> {
                    if (o instanceof DefaultMessageSourceResolvable) {
                        return null;
                    }
                    return o.toString();
                }).filter(Objects::nonNull).collect(Collectors.joining(", "));
                final ValidationError validationError = new ValidationError(Objects.requireNonNull(error.getDefaultMessage()), fields);
                validationErrorList.add(validationError);
            }
        });
        final ErrorInformationResponse errorDetails = new ErrorInformationResponse(
            ExceptionKeysEnum.ERROR_REQUEST_NOT_VALID.getKey());
        errorDetails.setObjectErrors(validationErrorList);
        return super.handleExceptionInternal(e, errorDetails, headers, status, request);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = InvalidRequestBodyException.class)
    public ErrorInformationResponse invalidRequestBody(final InvalidRequestBodyException e) {
        log.error(e.getMessage(), e);
        final List<ValidationError> validationErrorList = new ArrayList<>();
        e.getValidationErrors().forEach(error -> {
            final ValidationError validationError =
                new ValidationError(Objects.requireNonNull(error.getDefaultMessage()), error.getField());
            validationErrorList.add(validationError);
        });
        final ErrorInformationResponse errorInformationResponse =
            new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_NOT_VALID.getKey());
        errorInformationResponse.setObjectErrors(validationErrorList);
        return errorInformationResponse;
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = Exception.class)
    public ErrorInformationResponse handleIllegalArgumentException(final Exception e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.INTERNAL_SERVER_ERROR.getKey());
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = UnauthorizedException.class)
    public ErrorInformationResponse handleUnauthorizedException(final UnauthorizedException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_SECURITY_UNAUTHORIZED_USER.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = InvalidEmailException.class)
    public ErrorInformationResponse handleInvalidEmailException(final InvalidEmailException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_SECURITY_INVALID_EMAIL.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = DuplicatedEmailException.class)
    public ErrorInformationResponse handleDuplicatedEmailException(final DuplicatedEmailException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_DUPLICATED_EMAIL.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(value = WebClientException.class)
    public ErrorInformationResponse handleWebClientException(final WebClientException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(e.getMessage());
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(value = AccessDeniedException.class)
    public ErrorInformationResponse handleAccessDeniedException(final AccessDeniedException e) {
        log.warn(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_SECURITY_ACCESS_DENIED.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = OfferValueException.class)
    public ErrorInformationResponse handleInvalidOfferValueException(final OfferValueException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_NOT_VALID_OFFER_VALUE.getKey());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.IM_USED)
    @ExceptionHandler(value = RedirectionException.class)
    public ErrorInformationResponse handleInvalidRedirectionException(final RedirectionException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_NOT_VALID_REDIRECTION.getKey(), "le lien " +
            "est expiré", null);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = VersionCheckException.class)
    public ErrorInformationResponse versionCheckException(final VersionCheckException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_NOT_VALID_FRONT_VERSION_VALUE.getKey());
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(value = DuplicatedSirenException.class)
    public ErrorInformationResponse handleInvalidSirenException(final DuplicatedSirenException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_NOT_VALID_SIREN.getKey());
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = FileException.class)
    public ErrorInformationResponse notValidFile(final FileException e) {
        log.error(e.getMessage(), e);
        return new ErrorInformationResponse(ExceptionKeysEnum.ERROR_REQUEST_FILE_NOT_VALID.getKey());
    }
}
