package fr.hyperion.defmarket.controller.admin.offer;

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
import fr.hyperion.defmarket.controller.admin.offer.Mapper.OfferAdminMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.dto.request.offer.BlockActionOfferRequest;
import fr.hyperion.defmarket.dto.request.offer.OfferCreationRequest;
import fr.hyperion.defmarket.dto.request.offer.OfferUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.MoreInfoRequest;
import fr.hyperion.defmarket.dto.response.offer.AdminOfferResponse;
import fr.hyperion.defmarket.ports.offer.useCase.BlockOfferActionByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.CreateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.DeleteOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdateFileUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdatePhotoUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.UpdateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateOfferByAdminUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.ValidateOfferModerationUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNexOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByIdUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByNameUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOffersCountUseCase;
import fr.hyperion.defmarket.ports.user.usecase.SendRequestInfoMailUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/offer")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_ADMIN_OFFER')")
public class AdminOfferController extends AbstractController {
    private final GetOfferByNameUseCase getOfferByNameUseCase;
    private final CreateOfferByAdminUseCase createOfferByAdminUseCase;
    private final DeleteOfferByAdminUseCase deleteOfferByAdminUseCase;
    private final UpdateOfferByAdminUseCase updateOfferByAdminUseCase;
    private final ValidateOfferByAdminUseCase validateOfferByAdminUseCase;
    private final ValidateOfferModerationUseCase validateOfferModerationUseCase;
    private final BlockOfferActionByAdminUseCase blockOfferActionByAdminUseCase;
    private final GetOfferByIdUseCase getOfferUseCase;
    private final GetAllOfferUseCase getAllOfferUseCase;
    private final OfferUpdatePhotoUseCase offerUpdatePhotoUseCase;
    private final OfferUpdateFileUseCase offerUpdateFileUseCase;
    private final GetOffersCountUseCase getOffersCountUseCase;
    private final GetNexOfferUseCase getNexOfferUseCase;
    private final SendRequestInfoMailUseCase sendRequestInfoMailUseCase;


    private final OfferAdminMapper offerMapper;
    private final DocumentMapper documentMapper;

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_CREATE')")
    @Operation(summary = "Create Offer With Store_ID")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminOfferResponse> create(@RequestPart("offer") @Valid final OfferCreationRequest offerCreationRequest,
                                                     @RequestPart final Long storeId,
                                                     @RequestPart(value = "photo", required = false) final MultipartFile photo,
                                                     @RequestPart(value = "attachedFile", required = false) final MultipartFile attached,
                                                     final BindingResult result) throws IOException {
        checkBindingResult(result);
        final Document photoFile = documentMapper.toDocument(photo);
        final Document attachedFile = documentMapper.toDocument(attached);
        Offer offer = offerMapper.toEntity(offerCreationRequest, photoFile, attachedFile);
        offer = createOfferByAdminUseCase.createByAdmin(offer, storeId);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_DELETE')")
    @Operation(summary = "Delete Offer")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        deleteOfferByAdminUseCase.deleteByAdmin(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "Update Offer")
    @PutMapping("/{id}")
    public ResponseEntity<AdminOfferResponse> update(@PathVariable("id") final Long id,
                                                     @RequestBody @Valid final OfferUpdateRequest offerUpdateRequest,
                                                     final BindingResult result) {
        checkBindingResult(result);
        Offer offer = getOfferUseCase.getById(id);
        offer = updateOfferByAdminUseCase.updateByAdmin(offerMapper.toUpdate(offerUpdateRequest, offer), id);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "Update Logo Offer")
    @PatchMapping(path = "/{offerId}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminOfferResponse> updatePhoto(@PathVariable("offerId") final Long offerId,
                                                          @RequestPart(value = "photo", required = false) final MultipartFile photo) throws IOException {
        final Offer offer = offerUpdatePhotoUseCase.updatePhoto(documentMapper.toDocument(photo), offerId);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "Update AttachedFile")
    @PatchMapping(path = "/{offerId}/file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AdminOfferResponse> updateAttachedFile(@PathVariable("offerId") final Long offerId,
                                                                 @RequestPart(value = "file", required = false) final MultipartFile file) throws IOException {
        final Offer offer = offerUpdateFileUseCase.updateAttachedFile(documentMapper.toDocument(file), offerId);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "Validate offer By Id")
    @PatchMapping("/{offerId}/validate-offer")
    public ResponseEntity<Void> validateOfferById(@PathVariable final Long offerId) {
        validateOfferByAdminUseCase.validateOfferByAdmin(offerId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "Block/UnBlock offer By Id")
    @PatchMapping("/{offerId}/block-action")
    public ResponseEntity<Void> blockActionOfferById(@PathVariable final Long offerId,
                                                     @RequestBody final BlockActionOfferRequest blockActionOfferRequest) {
        blockOfferActionByAdminUseCase.blockOfferActionByAdmin(offerId, blockActionOfferRequest.blockAction,
            blockActionOfferRequest.reason);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_UPDATE')")
    @Operation(summary = "validate moderation")
    @PutMapping("/{offerId}/validate-moderation")
    public ResponseEntity<Void> validateModeration(@PathVariable final Long offerId) {
        validateOfferModerationUseCase.validateOfferModeration(offerId);
        return ResponseEntity.accepted().build();
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = "Get All Offers with filter")
    @GetMapping("/page")
    public ResponseEntity<Page<AdminOfferResponse>> getAll(@RequestParam(required = false) final Long storeId,
                                                           final Pageable pageable,
                                                           final AdminOfferFilter offerFilter) {
        final Page<Offer> allStoreOffers = getAllOfferUseCase.getAll(storeId, pageable, offerFilter);
        final Page<AdminOfferResponse> offerResponses = allStoreOffers.map(offerMapper::toResponse);
        return ResponseEntity.ok(offerResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = "Get All Offers of a Store")
    @GetMapping
    public ResponseEntity<List<AdminOfferResponse>> getAll(@RequestParam final Long storeId) {
        final List<Offer> allStoreOffers = getAllOfferUseCase.getAll(storeId);
        final List<AdminOfferResponse> offerResponses = offerMapper.toResponse(allStoreOffers);
        return ResponseEntity.ok(offerResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = "Get Offer By Title")
    @GetMapping("/search")
    public ResponseEntity<Page<AdminOfferResponse>> getOfferByTitle(final Pageable pageable,
                                                                    @RequestParam(required = false) final String offerName) {
        final Page<Offer> offers = getOfferByNameUseCase.getOfferByName(pageable, offerName);
        final Page<AdminOfferResponse> offerResponses = offers.map(offerMapper::toResponse);
        return ResponseEntity.ok(offerResponses);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = " Get the count of Offer  can be validated")
    @GetMapping("/count")
    public ResponseEntity<Long> getCounter(final AdminOfferFilter offerFilter) {
        final Long offersCount = getOffersCountUseCase.getOffersCount(offerFilter);
        return ResponseEntity.ok(offersCount);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = "GetNextOffer with id and filter")
    @GetMapping("/next")
    public ResponseEntity<AdminOfferResponse> getNextOffer(@RequestParam(required = false) final Long id,
                                                           final AdminOfferFilter adminOfferFilter) {
        final Offer offer = getNexOfferUseCase.getNextOffer(id, adminOfferFilter, false);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_ADMIN_OFFER_READ')")
    @Operation(summary = "GetPreviousOffer with id and filter")
    @GetMapping("/previous")
    public ResponseEntity<AdminOfferResponse> getPreviousOffer(@RequestParam(required = false) final Long id,
                                                               final AdminOfferFilter adminOfferFilter) {
        final Offer offer = getNexOfferUseCase.getNextOffer(id, adminOfferFilter, true);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @Operation(summary = "Request more information sending a mail to Offer ")
    @PostMapping("/{offerId}/request-more-info")
    public ResponseEntity<Void> sendRequestInfoMailForStore(@PathVariable final Long offerId,
                                                            @RequestBody @Valid final MoreInfoRequest moreInfoRequest) {
        sendRequestInfoMailUseCase.sendRequestInfoMailOffer(offerId, moreInfoRequest.subject, moreInfoRequest.message);
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Get Offer by id")
    @GetMapping("/{offerId}")
    public ResponseEntity<AdminOfferResponse> getOfferById(@PathVariable final Long offerId) {
        final Offer offer = getOfferUseCase.getById(offerId);
        final AdminOfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }
}
