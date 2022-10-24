package fr.hyperion.defmarket.controller.pro.storeCategory;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.storeCategory.mapper.StoreCategoryMapper;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.response.store.StoreCategoryResponse;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.ports.storeCategory.useCase.GetOneStoreCategoryUseCase;
import fr.hyperion.defmarket.ports.storeCategory.useCase.getters.GetAllStoreCategoryUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/store-category")
@RequiredArgsConstructor
@PreAuthorize("hasAnyAuthority('PERM_STORE', 'PERM_ADMIN_STORE')")
public class StoreCategoryController {

    private final GetAllStoreCategoryUseCase getAllStoreCategoryUseCase;
    private final GetOneStoreCategoryUseCase getOneStoreCategoryUseCase;

    private final StoreCategoryMapper storeCategoryMapper;

    @PreAuthorize("hasAnyAuthority('PERM_STORE', 'PERM_ADMIN_STORE')")
    @Operation(summary = "Get All Store Category")
    @GetMapping
    public ResponseEntity<List<StoreCategoryResponse>> getAll(@RequestParam(required = false) final StoreTypeEnum type) {
        final List<StoreCategory> storeCategories;
        if (type != null) {
            storeCategories = getAllStoreCategoryUseCase.getAll(type);
        } else {
            storeCategories = getAllStoreCategoryUseCase.getAll();
        }
        final List<StoreCategoryResponse> storeCategoryResponses = storeCategoryMapper.toResponse(storeCategories);
        return ResponseEntity.ok(storeCategoryResponses);
    }

    @PreAuthorize("hasAnyAuthority('PERM_STORE', 'PERM_ADMIN_STORE')")
    @Operation(summary = "Get Store Category by Id")
    @GetMapping("/{storeCategoryId}")
    public ResponseEntity<StoreCategoryResponse> getById(@PathVariable final Long storeCategoryId) {
        final StoreCategory storeCategory = getOneStoreCategoryUseCase.getOneStoreCategory(storeCategoryId);
        final StoreCategoryResponse storeCategoryResponse = storeCategoryMapper.toResponse(storeCategory);
        return ResponseEntity.ok(storeCategoryResponse);
    }

}
