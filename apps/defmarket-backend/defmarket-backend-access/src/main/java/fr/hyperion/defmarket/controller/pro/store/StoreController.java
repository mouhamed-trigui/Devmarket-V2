package fr.hyperion.defmarket.controller.pro.store;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.store.mapper.StoreMapper;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.dto.request.store.PracticedOfferBeforeDMRequest;
import fr.hyperion.defmarket.dto.request.store.StoreCreationRequest;
import fr.hyperion.defmarket.dto.request.store.StoreUpdateRequest;
import fr.hyperion.defmarket.dto.response.store.StoreDetailedResponse;
import fr.hyperion.defmarket.dto.response.store.StoreResponse;
import fr.hyperion.defmarket.ports.store.useCase.PracticedOfferBeforeDMUpdateUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreDeleteUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreFactoryUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateCoverUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateLogoUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateVisibilityUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllStoreOfCompanyUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByIdUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/store")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_STORE')")

public class StoreController extends AbstractController {
    private final StoreFactoryUseCase storeFactoryUseCase;
    private final StoreDeleteUseCase storeDeleteUseCase;
    private final StoreUpdateUseCase storeUpdateUseCase;
    private final StoreUpdateLogoUseCase storeUpdateLogoUseCase;
    private final StoreUpdateCoverUseCase storeUpdateCoverUseCase;
    private final StoreUpdateVisibilityUseCase storeUpdateVisibilityUseCase;
    private final PracticedOfferBeforeDMUpdateUseCase practicedOfferBeforeDMUpdateUseCase;


    private final GetStoreByIdUseCase getStoreByIdUseCase;
    private final GetAllStoreOfCompanyUseCase getAllStoreOfCompanyUseCase;

    private final StoreMapper storeMapper;
    private final DocumentMapper documentMapper;

    @PreAuthorize("hasAuthority('PERM_STORE_CREATE')")
    @Operation(summary = "Create Store With Company_ID")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<StoreResponse> create(@RequestPart("store") @Valid final StoreCreationRequest storeCreationRequest,
                                                @RequestPart(value = "logo", required = false) final MultipartFile logo, final BindingResult result) throws IOException {

        checkBindingResult(result);
        storeCreationRequest.logo = documentMapper.toDocument(logo);
        Store store = storeMapper.toEntity(storeCreationRequest);
        store = storeFactoryUseCase.create(store, storeCreationRequest.companyId);
        final StoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_READ')")
    @Operation(summary = "Get Store By Store Id")
    @GetMapping("/{id}")
    public ResponseEntity<StoreDetailedResponse> getById(@PathVariable("id") final Long storeId) {
        final Store store = getStoreByIdUseCase.getById(storeId);
        final StoreDetailedResponse storeResponse = storeMapper.toDetailedResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
    @Operation(summary = "Update Store")
    @PutMapping("/{id}")
    public ResponseEntity<StoreDetailedResponse> update(@RequestBody @Valid final StoreUpdateRequest storeUpdateRequest,
                                                        @PathVariable("id") final Long storeId,
                                                        final BindingResult result) {
        checkBindingResult(result);
        Store store = getStoreByIdUseCase.getById(storeId);
        store = storeMapper.toUpdate(storeUpdateRequest, store);
        store = storeUpdateUseCase.update(store, storeUpdateRequest.categoryId, storeId, storeUpdateRequest.socialMediaToRemove, storeUpdateRequest.phoneToRemove);
        final StoreDetailedResponse storeResponse = storeMapper.toDetailedResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
    @Operation(summary = "Update the Logo of a Store")
    @PatchMapping(path = "/{id}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<StoreResponse> updateLogo(@PathVariable("id") final Long id,
                                                    @RequestPart(value = "logo", required = false) final MultipartFile logo) throws IOException {
        final Store store = storeUpdateLogoUseCase.updateLogo(documentMapper.toDocument(logo), id);
        final StoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
    @Operation(summary = "Update the Cover of a Store")
    @PatchMapping(path = "/{id}/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<StoreResponse> updateCover(@PathVariable("id") final Long id,
                                                     @RequestPart(value = "cover", required = false) final MultipartFile cover) throws IOException {
        final Store store = storeUpdateCoverUseCase.updateCover(documentMapper.toDocument(cover), id);
        final StoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_READ')")
    @Operation(summary = "Get All Store by Company ID")
    @GetMapping
    public ResponseEntity<List<StoreResponse>> getAllStoreOfCompany(@RequestParam("companyId") final Long companyId) {
        final List<Store> allCompanyStores = getAllStoreOfCompanyUseCase.getAll(companyId);
        final List<StoreResponse> storeResponses = storeMapper.toResponse(allCompanyStores);
        return ResponseEntity.ok(storeResponses);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
    @PatchMapping("/{id}/visibility")
    public ResponseEntity<StoreResponse> updateVisibility(@PathVariable("id") final Long storeId, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final Store store = storeUpdateVisibilityUseCase.updateVisibility(storeId);
        final StoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_STORE_DELETE')")
    @Operation(summary = "Delete Store")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        storeDeleteUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
    @Operation(summary = "Update More Store Information")
    @PutMapping("/{id}/more-info")
    public ResponseEntity<StoreDetailedResponse> updatePracticedOfferBeforeDM(@RequestBody @Valid final PracticedOfferBeforeDMRequest practicedOfferBeforeDMRequest,
                                                                              @PathVariable("id") final Long id,
                                                                              final BindingResult result) {
        checkBindingResult(result);
        final PracticedOfferBeforeDM practicedOfferBeforeDM = storeMapper.toData(practicedOfferBeforeDMRequest);
        final Store store = practicedOfferBeforeDMUpdateUseCase.updatePracticedOfferBeforeDM(id, practicedOfferBeforeDM);
        final StoreDetailedResponse storeResponse = storeMapper.toDetailedResponse(store);
        return ResponseEntity.ok(storeResponse);
    }
}
