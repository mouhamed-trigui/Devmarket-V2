package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;

public interface GetOneStoreAdapter {
    Store getById(Long companyId, Long storeId);
}
