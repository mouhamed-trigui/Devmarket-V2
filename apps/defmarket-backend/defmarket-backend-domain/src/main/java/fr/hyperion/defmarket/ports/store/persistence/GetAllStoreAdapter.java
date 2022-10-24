package fr.hyperion.defmarket.ports.store.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;

public interface GetAllStoreAdapter {
    List<Store> getAll(Long companyId);
}
