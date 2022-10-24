package fr.hyperion.defmarket.ports.store.useCase.getters;

import fr.hyperion.defmarket.data.store.Store;

public interface GetByStoreIdUseCase {
    Store getById(Long storeId);
}
