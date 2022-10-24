package fr.hyperion.defmarket.database.repository;

import java.util.List;

import fr.hyperion.defmarket.database.entity.StoreCategoryDB;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;

public interface StoreCategoryRepository extends CustomBaseJpaRepository<StoreCategoryDB, Long> {
    List<StoreCategoryDB> findByStoreType(StoreTypeEnum storeType);
}
