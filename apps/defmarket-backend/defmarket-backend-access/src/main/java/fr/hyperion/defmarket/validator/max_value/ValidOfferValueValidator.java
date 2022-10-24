package fr.hyperion.defmarket.validator.max_value;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import fr.hyperion.defmarket.dto.request.offer.OfferCreationRequest;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;

public class ValidOfferValueValidator implements ConstraintValidator<ValidOfferValue, OfferCreationRequest> {
    @Override
    public void initialize(final ValidOfferValue constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(final OfferCreationRequest offerCreationRequest, final ConstraintValidatorContext context) {
        if (offerCreationRequest.offerType != null && offerCreationRequest.offerType.equals(OfferTypeEnum.PERCENTAGE)) {
            return Double.parseDouble(offerCreationRequest.value) <= 100;
        }
        return true;
    }
}
