package fr.hyperion.defmarket.validator.timeLine;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = TimeLineValidator.class)
@Documented
public @interface ValidTimeLine {

    String message() default "{fr.hyperion.defmarket.exposition.rest.validator.TimelineNotValid.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String start();

    String end();

}
