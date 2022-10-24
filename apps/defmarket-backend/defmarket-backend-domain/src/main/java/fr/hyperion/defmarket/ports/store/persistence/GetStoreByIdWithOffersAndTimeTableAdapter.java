package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;

public interface GetStoreByIdWithOffersAndTimeTableAdapter {

	StoreWithOffersAndTimeTable getStoreByIdWithOffersAndTimeTable(Long storeId);
}
