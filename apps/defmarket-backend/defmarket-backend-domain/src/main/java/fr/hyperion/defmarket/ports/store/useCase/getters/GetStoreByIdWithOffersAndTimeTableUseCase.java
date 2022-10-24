package fr.hyperion.defmarket.ports.store.useCase.getters;

import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;

public interface GetStoreByIdWithOffersAndTimeTableUseCase {

	StoreWithOffersAndTimeTable getStoreByIdWithOffersAndTimeTable(Long storeId);

}
