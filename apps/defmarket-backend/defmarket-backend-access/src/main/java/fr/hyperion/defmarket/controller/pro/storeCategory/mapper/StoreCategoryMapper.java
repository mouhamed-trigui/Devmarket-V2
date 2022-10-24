package fr.hyperion.defmarket.controller.pro.storeCategory.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.response.store.StoreCategoryResponse;

@Mapper
public interface StoreCategoryMapper {
    StoreCategoryResponse toResponse(StoreCategory storeCategory);

    List<StoreCategoryResponse> toResponse(List<StoreCategory> storeCategory);
}
