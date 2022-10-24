package fr.hyperion.defmarket.validator.job;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import fr.hyperion.defmarket.dto.request.user.OperatorCreationRequest;

public class JobNotNullIfIsVeteranValidator
    implements ConstraintValidator<JobNotNullIfIsVeteran, OperatorCreationRequest> {


    @Override
    public void initialize(final JobNotNullIfIsVeteran annotation) {
    }

    @Override
    public boolean isValid(final OperatorCreationRequest value, final ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        if (value.veteran) {
            return value.jobId != null;
        }
        return value.jobId == null;

    }
}
