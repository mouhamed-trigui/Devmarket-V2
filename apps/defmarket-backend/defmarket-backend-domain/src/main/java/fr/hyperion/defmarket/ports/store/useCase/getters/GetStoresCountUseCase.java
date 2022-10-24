package fr.hyperion.defmarket.ports.store.useCase.getters;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;

public interface GetStoresCountUseCase {
    Long getStoresCount(AdminStoreFilter adminStoreFilter);
}
