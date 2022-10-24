package fr.hyperion.defmarket.ports.store.useCase;

import fr.hyperion.defmarket.data.store.Store;

public interface StoreUpdateVisibilityUseCase {
    Store updateVisibility(Long storeId);
}
