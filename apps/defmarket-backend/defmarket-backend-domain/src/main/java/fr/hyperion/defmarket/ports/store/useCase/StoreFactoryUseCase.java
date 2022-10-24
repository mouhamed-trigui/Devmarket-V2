package fr.hyperion.defmarket.ports.store.useCase;

import fr.hyperion.defmarket.data.store.Store;

public interface StoreFactoryUseCase {
    Store create(Store store, Long companyId);
}
