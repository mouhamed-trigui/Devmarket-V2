package fr.hyperion.defmarket.ports.store.useCase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;

public interface GetAllLocalStoreUseCase {
	Page<StoreWithTimeTable> getAllLocalStore(Pageable pageable, CustomerStoreFilter customerStoreFilter);
}
