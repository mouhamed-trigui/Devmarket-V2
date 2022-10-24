package fr.hyperion.defmarket.validator.max_value;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Constraint(validatedBy = ValidOfferValueValidator.class)
@Target({TYPE})
@Retention(RUNTIME)
public @interface ValidOfferValue {
    String message() default "ValidOfferValue.message";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String field() default "value";
}
