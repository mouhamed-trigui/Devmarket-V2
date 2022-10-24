package fr.hyperion.defmarket.ports.store.useCase.getters;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;

public interface GetNextStoresUseCase {
    Store getNextStore(final Long currentStoreId, final AdminStoreFilter adminStoreFilter, final boolean desc);
}
