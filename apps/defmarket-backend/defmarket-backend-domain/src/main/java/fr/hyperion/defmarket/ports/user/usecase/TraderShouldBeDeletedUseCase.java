package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface TraderShouldBeDeletedUseCase {
    boolean isDeleted(DefmarketUser user);
}
