package fr.hyperion.defmarket.ports.store.useCase.getters;

import fr.hyperion.defmarket.data.store.Store;

public interface GetStoreByIdUseCase {
    Store getById(Long storeId);
}
