package fr.hyperion.defmarket.ports.user.usecase;

public interface UserForgetPasswordUseCase {
    void sendEmailForgetPassword(String email);
}
