package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface UpdateUserEmailUseCase {
    void updateEmail(Operator user, String oldEmail, String newEmail);
}
