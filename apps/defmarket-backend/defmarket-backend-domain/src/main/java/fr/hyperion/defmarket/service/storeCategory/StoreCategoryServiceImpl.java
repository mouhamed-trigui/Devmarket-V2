package fr.hyperion.defmarket.service.storeCategory;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.storeCategory.persistence.GetAllStoreCategoryAdapter;
import fr.hyperion.defmarket.ports.storeCategory.persistence.GetOneStoreCategoryAdapter;
import fr.hyperion.defmarket.ports.storeCategory.useCase.GetOneStoreCategoryUseCase;
import fr.hyperion.defmarket.ports.storeCategory.useCase.getters.GetAllStoreCategoryUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoreCategoryServiceImpl implements GetAllStoreCategoryUseCase, GetOneStoreCategoryUseCase {

    private final GetAllStoreCategoryAdapter getAllStoreCategoryAdapter;
    private final GetOneStoreCategoryAdapter getOneStoreCategoryAdapter;

    @Override
    public List<StoreCategory> getAll() {
        return getAllStoreCategoryAdapter.getAll();
    }

    @Override
    public List<StoreCategory> getAll(final StoreTypeEnum type) {
        return getAllStoreCategoryAdapter.getAll(type);
    }

    @Override
    public StoreCategory getOneStoreCategory(final Long categoryId) {
        return getOneStoreCategoryAdapter.getOneStoreCategory(categoryId);
    }
}
