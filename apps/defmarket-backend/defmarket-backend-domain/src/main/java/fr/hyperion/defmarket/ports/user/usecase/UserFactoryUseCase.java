package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface UserFactoryUseCase {
    Operator addUser(Operator user);
}
