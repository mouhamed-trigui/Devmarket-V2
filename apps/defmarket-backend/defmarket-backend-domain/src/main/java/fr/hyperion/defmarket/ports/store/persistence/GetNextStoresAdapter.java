package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;

public interface GetNextStoresAdapter {
    Store getNextStore(final Long currentStoreId, final AdminStoreFilter adminStoreFilter, final boolean desc);
}
