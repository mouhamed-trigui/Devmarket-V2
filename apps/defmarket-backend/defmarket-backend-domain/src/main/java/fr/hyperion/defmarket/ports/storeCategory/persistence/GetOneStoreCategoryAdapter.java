package fr.hyperion.defmarket.ports.storeCategory.persistence;

import fr.hyperion.defmarket.data.store.StoreCategory;

public interface GetOneStoreCategoryAdapter {
    StoreCategory getOneStoreCategory(Long categoryId);
}
