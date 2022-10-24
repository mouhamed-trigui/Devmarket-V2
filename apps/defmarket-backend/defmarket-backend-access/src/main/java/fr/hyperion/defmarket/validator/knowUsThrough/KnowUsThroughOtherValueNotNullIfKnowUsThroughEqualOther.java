package fr.hyperion.defmarket.validator.knowUsThrough;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOtherValidator.class)
@Documented
public @interface KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOther {

    String message() default "{fr.hyperion.defmarket.exposition.rest.validator.NotNullIfAnotherFieldHasValue.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
