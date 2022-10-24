package fr.hyperion.defmarket.ports.storeCategory.useCase;

import fr.hyperion.defmarket.data.store.StoreCategory;

public interface GetOneStoreCategoryUseCase {
    StoreCategory getOneStoreCategory(Long categoryId);
}
