package fr.hyperion.defmarket.controller.customer.storeCategory;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.customer.storeCategory.mapper.CustomerStoreCategoryMapper;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.response.store.StoreCategoryResponse;
import fr.hyperion.defmarket.ports.storeCategory.useCase.getters.GetAllStoreCategoryUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_CUSTOMER + "/store-category")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_STORE')")
public class CustomerStoreCategoryController {
	private final GetAllStoreCategoryUseCase getAllStoreCategoryUseCase;

	private final CustomerStoreCategoryMapper customerStoreCategoryMapper;

	@Operation(summary = "Get All Store Category")
	@GetMapping
	public ResponseEntity<List<StoreCategoryResponse>> getAll() {
		final List<StoreCategory> storeCategories = getAllStoreCategoryUseCase.getAll();
		final List<StoreCategoryResponse> storeCategoryResponses = customerStoreCategoryMapper
				.mapToStoreCategoryResponse(storeCategories);
		return ResponseEntity.ok(storeCategoryResponses);
	}

}
