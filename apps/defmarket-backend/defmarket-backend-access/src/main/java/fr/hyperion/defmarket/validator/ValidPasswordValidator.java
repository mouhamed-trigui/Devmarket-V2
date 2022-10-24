package fr.hyperion.defmarket.validator;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.WhitespaceRule;

public class ValidPasswordValidator implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(final ValidPassword constraintAnnotation) {
        // No need to initialize
    }

    @Override
    public boolean isValid(final String password, final ConstraintValidatorContext context) {
    	if (password == null) {
            return true;
        }
        final PasswordValidator validator = new PasswordValidator(Arrays.asList(
                // length between 5 and 80 characters
                new LengthRule(5, 80),
                // at least one upper-case character
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                // at least one lower-case character
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                // at least one digit character
                new CharacterRule(EnglishCharacterData.Digit, 1),
                // at least one symbol (special character)
                new CharacterRule(EnglishCharacterData.Special, 1),
                // no whitespace
                new WhitespaceRule()
//                // rejects passwords that contain a sequence of >= 5 characters alphabetical  (e.g. abcdef)
//                new IllegalSequenceRule(EnglishSequenceData.Alphabetical, 5, false),
//                // rejects passwords that contain a sequence of >= 5 characters numerical   (e.g. 12345)
//                new IllegalSequenceRule(EnglishSequenceData.Numerical, 5, false)
        ));
        final RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid()) {
            return true;
        }
        final List<String> messages = validator.getMessages(result);

        final String messageTemplate = String.join(",", messages);
        context.buildConstraintViolationWithTemplate(messageTemplate)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();
        return false;
    }
}
