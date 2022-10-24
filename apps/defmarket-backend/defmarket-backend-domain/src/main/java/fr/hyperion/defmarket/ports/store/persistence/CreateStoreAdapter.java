package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;

public interface CreateStoreAdapter {
    Store create(Store store, Long companyId);
}
