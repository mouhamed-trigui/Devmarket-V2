package fr.hyperion.defmarket.ports.user.usecase;

public interface ExistsUserByEmailUseCase {
    boolean existsByEmail(String email);
}
