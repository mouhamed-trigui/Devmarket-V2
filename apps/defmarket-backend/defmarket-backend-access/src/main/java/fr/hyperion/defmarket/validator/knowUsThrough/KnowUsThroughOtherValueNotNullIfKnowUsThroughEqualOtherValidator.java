package fr.hyperion.defmarket.validator.knowUsThrough;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import fr.hyperion.defmarket.dto.request.user.OperatorCreationRequest;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;

public class KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOtherValidator
    implements ConstraintValidator<KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOther, OperatorCreationRequest> {


    @Override
    public void initialize(final KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOther annotation) {
    }

    @Override
    public boolean isValid(final OperatorCreationRequest value, final ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        if (value.knowUsThroughOtherValue != null) {
            return value.knowUsThrough == KnowUsThroughEnum.OTHER && !value.knowUsThroughOtherValue.isEmpty();
        }
        return value.knowUsThrough != KnowUsThroughEnum.OTHER;

    }

}
