package fr.hyperion.defmarket.ports.user.usecase;

public interface UserExpoTokensUseCase {

	void addExpoToken(Long userId, String expoToken);
	void deleteExpoToken(Long userId, String expoToken);

}
