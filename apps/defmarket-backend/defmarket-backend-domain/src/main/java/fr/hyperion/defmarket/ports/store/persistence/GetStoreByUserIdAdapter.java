package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;

public interface GetStoreByUserIdAdapter {
    Store getByUserId(Long userId);
}
