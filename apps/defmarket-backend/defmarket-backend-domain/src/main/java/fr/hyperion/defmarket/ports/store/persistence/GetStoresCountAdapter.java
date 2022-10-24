package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;

public interface GetStoresCountAdapter {
    Long getStoresCount(AdminStoreFilter adminStoreFilter);
}
