package fr.hyperion.defmarket.validator.timeLine;

import java.time.Instant;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.BeanWrapperImpl;

public class TimeLineValidator implements ConstraintValidator<ValidTimeLine, Object> {

    private String start;
    private String end;

    @Override
    public void initialize(final ValidTimeLine constraintAnnotation) {
        start = constraintAnnotation.start();
        end = constraintAnnotation.end();
    }

    @Override
    public boolean isValid(final Object value, final ConstraintValidatorContext context) {
        final BeanWrapperImpl beanWrapper = new BeanWrapperImpl(value);
        final Instant startInstant = (Instant) beanWrapper.getPropertyValue(start);
        final Instant endInstant = (Instant) beanWrapper.getPropertyValue(end);
        if (startInstant == null || endInstant == null) {
            return true;
        }
        return endInstant.isAfter(startInstant);
    }
}
