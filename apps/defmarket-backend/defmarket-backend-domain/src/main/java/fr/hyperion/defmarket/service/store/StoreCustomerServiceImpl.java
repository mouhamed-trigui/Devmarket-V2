package fr.hyperion.defmarket.service.store;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.ports.store.persistence.GetAllLocalStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdWithOffersAndTimeTableAdapter;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllLocalStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByIdWithOffersAndTimeTableUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreCustomerServiceImpl implements GetAllLocalStoreUseCase , GetStoreByIdWithOffersAndTimeTableUseCase {

	private final GetAllLocalStoreAdapter getAllLocalStoreAdapter;
	private final GetStoreByIdWithOffersAndTimeTableAdapter getStoreByIdWithOffersAndTimeTableAdapter;

	@Override
	public Page<StoreWithTimeTable> getAllLocalStore(final Pageable pageable,
			final CustomerStoreFilter customerStoreFilter) {
		return getAllLocalStoreAdapter.getAllLocalStore(pageable, customerStoreFilter);
	}

	@Override
	public StoreWithOffersAndTimeTable getStoreByIdWithOffersAndTimeTable(Long storeId) {
		return getStoreByIdWithOffersAndTimeTableAdapter.getStoreByIdWithOffersAndTimeTable(storeId);
	}
}
