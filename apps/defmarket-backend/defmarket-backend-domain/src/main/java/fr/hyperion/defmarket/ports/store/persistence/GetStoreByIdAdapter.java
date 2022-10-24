package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;

public interface GetStoreByIdAdapter {
    Store getStoreById(Long storeId);

    Store getStoreByIdToDelete(Long storeId);
}
