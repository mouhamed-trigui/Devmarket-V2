package fr.hyperion.defmarket.ports.store.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;

public interface UpdateStoreAdapter {
    Store update(Store store, Long categoryId, List<Long> socialMediaToRemove, List<Long> phoneToRemove);
}
