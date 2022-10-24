package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface ValidChangeEmailUseCase {
    void changeEmail(Operator user, String key);
}
