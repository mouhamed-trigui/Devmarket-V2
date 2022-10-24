package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;

public interface UpdateStoreVisibilityAdapter {
    Store updateVisibility(Long storeId);
}
