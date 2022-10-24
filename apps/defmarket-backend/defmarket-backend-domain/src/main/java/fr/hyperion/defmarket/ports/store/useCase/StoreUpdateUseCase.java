package fr.hyperion.defmarket.ports.store.useCase;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;

public interface StoreUpdateUseCase {
    Store update(Store store, Long categoryId, Long storeId, List<Long> socialMediaToRemove, List<Long> phoneToRemove);
}
