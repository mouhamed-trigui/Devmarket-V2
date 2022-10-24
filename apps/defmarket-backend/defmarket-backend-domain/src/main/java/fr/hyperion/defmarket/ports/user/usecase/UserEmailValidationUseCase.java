package fr.hyperion.defmarket.ports.user.usecase;

public interface UserEmailValidationUseCase {
    void validateEmail(String email, String key);

    void resendValidateEmail(String email);
}
