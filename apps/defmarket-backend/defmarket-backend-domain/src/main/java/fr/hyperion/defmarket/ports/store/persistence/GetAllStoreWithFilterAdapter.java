package fr.hyperion.defmarket.ports.store.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;

public interface GetAllStoreWithFilterAdapter {
    Page<Store> getAllByFilter(Pageable pageable, AdminStoreFilter StoreFilter);
}
