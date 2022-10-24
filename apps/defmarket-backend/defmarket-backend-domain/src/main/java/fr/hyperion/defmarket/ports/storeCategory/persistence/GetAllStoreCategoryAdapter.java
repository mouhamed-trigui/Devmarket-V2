package fr.hyperion.defmarket.ports.storeCategory.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;

public interface GetAllStoreCategoryAdapter {
    List<StoreCategory> getAll();

    List<StoreCategory> getAll(StoreTypeEnum type);
}
