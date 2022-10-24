package fr.hyperion.defmarket.ports.store.useCase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;

public interface GetAllStoreWithFilterUseCase {
    Page<Store> getAll(Pageable pageable, AdminStoreFilter storeFilter);
}
