package fr.hyperion.defmarket.ports.storeCategory.useCase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;

public interface GetAllStoreCategoryUseCase {
    List<StoreCategory> getAll();

    List<StoreCategory> getAll(StoreTypeEnum type);
}
