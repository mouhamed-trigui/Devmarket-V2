package fr.hyperion.defmarket.validator;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = PasswordChangeValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface PasswordChange {
    String message() default "Same password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
