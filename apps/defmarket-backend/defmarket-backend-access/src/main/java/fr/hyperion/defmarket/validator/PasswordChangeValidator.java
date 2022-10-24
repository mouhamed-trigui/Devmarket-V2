package fr.hyperion.defmarket.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import fr.hyperion.defmarket.dto.request.user.PasswordChangeRequest;

public class PasswordChangeValidator implements ConstraintValidator<PasswordChange, PasswordChangeRequest> {
    @Override
    public void initialize(final PasswordChange constraintAnnotation) {
        // No need to initialize
    }

    @Override
    public boolean isValid(final PasswordChangeRequest value, final ConstraintValidatorContext context) {
        return !value.newPassword.equals(value.oldPassword);
    }
}
