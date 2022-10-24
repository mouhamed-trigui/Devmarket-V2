package fr.hyperion.defmarket.adapters.storeCategory;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.storeCategory.mapper.StoreCategoryDBMapper;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB;
import fr.hyperion.defmarket.database.repository.StoreCategoryRepository;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.storeCategory.persistence.GetAllStoreCategoryAdapter;
import fr.hyperion.defmarket.ports.storeCategory.persistence.GetOneStoreCategoryAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StoreCategoryAdapter implements GetAllStoreCategoryAdapter, GetOneStoreCategoryAdapter {

    private final StoreCategoryRepository storeCategoryRepository;

    private final StoreCategoryDBMapper storeCategoryDBMapper;

    @Override
    @Transactional(readOnly = true)
    public List<StoreCategory> getAll() {
        final List<StoreCategoryDB> storeCategoryDBS = storeCategoryRepository.findAll();
        return storeCategoryDBMapper.toData(storeCategoryDBS);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StoreCategory> getAll(final StoreTypeEnum type) {
        final List<StoreCategoryDB> storeCategoryDBS = storeCategoryRepository.findByStoreType(type);
        return storeCategoryDBMapper.toData(storeCategoryDBS);
    }

    @Override
    @Transactional
    public StoreCategory getOneStoreCategory(final Long categoryId) {
        final StoreCategoryDB storeCategoryDB = storeCategoryRepository.getReferenceById(categoryId);
        return storeCategoryDBMapper.toData(storeCategoryDB);
    }
}
