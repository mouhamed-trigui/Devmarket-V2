package fr.hyperion.defmarket.controller.admin.store;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import fr.hyperion.defmarket.controller.admin.store.mapper.StoreAdminMapper;
import fr.hyperion.defmarket.data.store.AdminStoreFilter;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.dto.request.store.BlockActionStoreRequest;
import fr.hyperion.defmarket.dto.request.store.StoreCreationRequest;
import fr.hyperion.defmarket.dto.request.store.StoreUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.MoreInfoRequest;
import fr.hyperion.defmarket.dto.response.store.AdminStoreDetailedResponse;
import fr.hyperion.defmarket.dto.response.store.AdminStoreResponse;
import fr.hyperion.defmarket.dto.response.store.StoreDetailedResponse;
import fr.hyperion.defmarket.ports.store.useCase.BlockStoreByAdminActionUseCase;
import fr.hyperion.defmarket.ports.store.useCase.CreateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateCoverUseCase;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateLogoUseCase;
import fr.hyperion.defmarket.ports.store.useCase.UpdateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateStoreByAdminUseCase;
import fr.hyperion.defmarket.ports.store.useCase.ValidateStoreModerationUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllStoreOfCompanyUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllStoreWithFilterUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetByStoreIdUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetNextStoresUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByIdUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByNameOrCityUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoresCountUseCase;
import fr.hyperion.defmarket.ports.user.usecase.SendRequestInfoMailUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/store")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_ADMIN_STORE')")
public class AdminStoreController extends AbstractController {
    private final CreateStoreByAdminUseCase createStoreByAdminUseCase;
    private final DeleteStoreByAdminUseCase deleteStoreByAdminUseCase;
    private final UpdateStoreByAdminUseCase updateStoreByAdminUseCase;
    private final ValidateStoreByAdminUseCase validateStoreByAdminUseCase;
    private final BlockStoreByAdminActionUseCase blockStoreByAdminActionUseCase;
    private final GetByStoreIdUseCase getByStoreIdUseCase;
    private final GetAllStoreOfCompanyUseCase getAllStoreOfCompanyUseCase;
    private final GetStoresCountUseCase GetStoresCountUseCase;
    private final GetNextStoresUseCase getNextStoresUseCase;
    private final ValidateStoreModerationUseCase validateStoreModerationUseCase;
    private final GetAllStoreWithFilterUseCase getAllStoreWithFilterUseCase;
    private final GetStoreByNameOrCityUseCase getStoreByNameOrCityUseCase;
    private final StoreUpdateLogoUseCase storeUpdateLogoUseCase;
    private final StoreUpdateCoverUseCase storeUpdateCoverUseCase;
    private final GetStoreByIdUseCase getStoreByIdUseCase;
    private final SendRequestInfoMailUseCase sendRequestInfoMailUseCase;

    private final StoreAdminMapper storeMapper;
    private final DocumentMapper documentMapper;

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "Get All Store by Company ID")
    @GetMapping
    public ResponseEntity<List<AdminStoreResponse>> getAllStoreOfCompany(@RequestParam final Long companyId) {
        final List<Store> allCompanyStores = getAllStoreOfCompanyUseCase.getAll(companyId);
        final List<AdminStoreResponse> storeResponses = storeMapper.toAdminStoreResponse(allCompanyStores);
        return ResponseEntity.ok(storeResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_CREATE')")
    @Operation(summary = "Create Store With Company_ID")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminStoreResponse> create(@RequestPart("store") final StoreCreationRequest storeCreationRequest,
                                                     @RequestPart(value = "logo", required = false) final MultipartFile logo,
                                                     @RequestPart(value = "cover", required = false) final MultipartFile cover,
                                                     final BindingResult result) throws IOException {
        checkBindingResult(result);
        storeCreationRequest.logo = documentMapper.toDocument(logo);
        storeCreationRequest.cover = documentMapper.toDocument(cover);
        Store store = storeMapper.toEntity(storeCreationRequest);
        store = createStoreByAdminUseCase.createByAdmin(store, storeCreationRequest.companyId);
        final AdminStoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "Update Store")
    @PutMapping("/{storeId}")
    public ResponseEntity<StoreDetailedResponse> update(@PathVariable final Long storeId, @RequestBody final StoreUpdateRequest storeUpdateRequest,
                                                        final BindingResult result) {
        checkBindingResult(result);
        Store store = getByStoreIdUseCase.getById(storeId);
        store = storeMapper.toUpdate(storeUpdateRequest, store);
        store = updateStoreByAdminUseCase.updateByAdmin(store, storeUpdateRequest.categoryId, storeUpdateRequest.socialMediaToRemove, storeUpdateRequest.phoneToRemove);
        final StoreDetailedResponse storeResponse = storeMapper.toDetailedResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "Update the Logo of a Store")
    @PatchMapping(path = "/{storeId}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminStoreResponse> updateLogo(@PathVariable("storeId") final Long storeId,
                                                         @RequestPart(value = "logo", required = false) final MultipartFile logo) throws IOException {
        final Store store = storeUpdateLogoUseCase.updateLogo(documentMapper.toDocument(logo), storeId);
        final AdminStoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "Update the Cover of a Store")
    @PatchMapping(path = "/{storeId}/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminStoreResponse> updateCover(@PathVariable("storeId") final Long storeId,
                                                          @RequestPart(value = "cover", required = false) final MultipartFile cover) throws IOException {
        final Store store = storeUpdateCoverUseCase.updateCover(documentMapper.toDocument(cover), storeId);
        final AdminStoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_DELETE')")
    @Operation(summary = "Delete Store")
    @DeleteMapping("/{storeId}")
    public ResponseEntity<Void> delete(@PathVariable final Long storeId) {
        deleteStoreByAdminUseCase.deleteByAdmin(storeId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "Validate Store By Id")
    @PatchMapping("/{storeId}/validate-store")
    public ResponseEntity<Void> validateStoreById(@PathVariable final Long storeId) {
        validateStoreByAdminUseCase.validateStoreByAdmin(storeId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "Block/UnBlock store By Id")
    @PatchMapping("/{storeId}/block-action")
    public ResponseEntity<Void> blockActionStoreById(@PathVariable final Long storeId,
                                                     @RequestBody final BlockActionStoreRequest blockActionStoreRequest) {
        blockStoreByAdminActionUseCase.blockStoreAction(storeId, blockActionStoreRequest.blockAction,
            blockActionStoreRequest.reason);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_UPDATE')")
    @Operation(summary = "validate moderation")
    @PutMapping("/{storeId}/validate-moderation")
    public ResponseEntity<Void> validateModeration(@PathVariable final Long storeId) {
        validateStoreModerationUseCase.validateStoreModeration(storeId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = " Get the count of Store  can be validated")
    @GetMapping("/count")
    public ResponseEntity<Long> getCounter(final AdminStoreFilter adminStoreFilter) {
        final Long storesCount = GetStoresCountUseCase.getStoresCount(adminStoreFilter);
        return ResponseEntity.ok(storesCount);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "GetNextStore with id and filter")
    @GetMapping("/next")
    public ResponseEntity<AdminStoreResponse> getNextStore(@RequestParam(required = false) final Long id,
                                                           final AdminStoreFilter adminStoreFilter) {
        final Store store = getNextStoresUseCase.getNextStore(id, adminStoreFilter, false);
        final AdminStoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "GetPreviousStore with id and filter")
    @GetMapping("/previous")
    public ResponseEntity<AdminStoreResponse> getPreviousStore(@RequestParam(required = false) final Long id,
                                                               final AdminStoreFilter adminStoreFilter) {
        final Store store = getNextStoresUseCase.getNextStore(id, adminStoreFilter, true);
        final AdminStoreResponse storeResponse = storeMapper.toResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "Get Store By Name or City Name")
    @GetMapping("/search")
    public ResponseEntity<Page<AdminStoreResponse>> GetStoreByNameOrCity(final Pageable pageable,
                                                                         @RequestParam(required = false) final String input) {
        final Page<Store> stores = getStoreByNameOrCityUseCase.getStoreByNameOrCity(pageable, input);
        final Page<AdminStoreResponse> storeResponses = stores.map(storeMapper::toResponse);
        return ResponseEntity.ok(storeResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "Get All Store with filter")
    @GetMapping("/page")
    public ResponseEntity<Page<AdminStoreResponse>> getAll(final Pageable pageable,
                                                           final AdminStoreFilter storeFilter) {
        final Page<Store> allStoreOffers = getAllStoreWithFilterUseCase.getAll(pageable, storeFilter);
        final Page<AdminStoreResponse> storeResponses = allStoreOffers.map(storeMapper::toResponse);
        return ResponseEntity.ok(storeResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_STORE_READ')")
    @Operation(summary = "Get Store By Store Id")
    @GetMapping("/{id}")
    public ResponseEntity<AdminStoreDetailedResponse> getById(@PathVariable("id") final Long storeId) {
        final Store store = getStoreByIdUseCase.getById(storeId);
        final AdminStoreDetailedResponse storeResponse = storeMapper.toDetailedResponse(store);
        return ResponseEntity.ok(storeResponse);
    }

    @Operation(summary = "Request more information sending a mail to store ")
    @PostMapping("/{storeId}/request-more-info")
    public ResponseEntity<Void> sendRequestInfoMailForStore(@PathVariable final Long storeId,
                                                            @RequestBody @Valid final MoreInfoRequest moreInfoRequest) {
        sendRequestInfoMailUseCase.sendRequestInfoMailStore(storeId, moreInfoRequest.subject, moreInfoRequest.message);
        return ResponseEntity.accepted().build();
    }

}
