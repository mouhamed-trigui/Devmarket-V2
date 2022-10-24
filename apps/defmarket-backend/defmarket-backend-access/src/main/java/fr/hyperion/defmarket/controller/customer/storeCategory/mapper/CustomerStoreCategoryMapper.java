package fr.hyperion.defmarket.controller.customer.storeCategory.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.response.store.StoreCategoryResponse;

@Mapper
public interface CustomerStoreCategoryMapper {

	List<StoreCategoryResponse> mapToStoreCategoryResponse(List<StoreCategory> storeCategories);

	
}
