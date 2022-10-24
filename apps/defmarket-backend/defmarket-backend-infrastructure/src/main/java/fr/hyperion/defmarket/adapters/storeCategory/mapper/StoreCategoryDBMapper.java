package fr.hyperion.defmarket.adapters.storeCategory.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB;

@Mapper
public interface StoreCategoryDBMapper {
    StoreCategory toData(StoreCategoryDB storeCategoryDB);

    List<StoreCategory> toData(List<StoreCategoryDB> storeCategoryDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "stores", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    StoreCategoryDB toDB(StoreCategory storeCategory);
}
