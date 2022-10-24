package fr.hyperion.defmarket.controller.pro.offer;

import java.io.IOException;

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
import fr.hyperion.defmarket.controller.pro.offer.Mapper.OfferMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.dto.request.offer.OfferCreationRequest;
import fr.hyperion.defmarket.dto.request.offer.OfferUpdateRequest;
import fr.hyperion.defmarket.dto.response.offer.OfferResponse;
import fr.hyperion.defmarket.ports.offer.useCase.OfferDeleteUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferFactoryUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdateFileUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdatePhotoUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.OfferUpdateUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetAllOfferUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByIdUseCase;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetOfferByNameUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/offer")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_OFFER')")

public class OfferController extends AbstractController {
    private final OfferFactoryUseCase offerFactoryUseCase;
    private final OfferDeleteUseCase offerDeleteUseCase;
    private final OfferUpdateUseCase offerUpdateUseCase;
    private final OfferUpdatePhotoUseCase offerUpdatePhotoUseCase;
    private final OfferUpdateFileUseCase offerUpdateFileUseCase;
    private final GetOfferByIdUseCase getOfferByIdUseCase;
    private final GetAllOfferUseCase getAllOfferUseCase;
    private final GetOfferByNameUseCase getOfferByNameUseCase;

    private final OfferMapper offerMapper;
    private final DocumentMapper documentMapper;

    @PreAuthorize("hasAuthority('PERM_OFFER_CREATE')")
    @Operation(summary = "Create Offer With Store_ID")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OfferResponse> create(@RequestPart("offer") @Valid final OfferCreationRequest offerCreationRequest,
                                                @RequestPart final Long storeId,
                                                @RequestPart(value = "photo", required = false) final MultipartFile photo,
                                                @RequestPart(value = "attachedFile", required = false) final MultipartFile attached,
                                                final BindingResult result) throws IOException {

        checkBindingResult(result);
        final Document photoFile = documentMapper.toDocument(photo);
        final Document attachedFile = documentMapper.toDocument(attached);
        Offer offer = offerMapper.toEntity(offerCreationRequest, photoFile, attachedFile);
        offer = offerFactoryUseCase.create(offer, storeId);
        final OfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_DELETE')")
    @Operation(summary = "Delete Offer")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        offerDeleteUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_UPDATE')")
    @Operation(summary = "Update Offer")
    @PutMapping("/{id}")
    public ResponseEntity<OfferResponse> update(@RequestBody @Valid final OfferUpdateRequest offerUpdateRequest,
                                                @PathVariable("id") final Long id, final BindingResult result) {
        checkBindingResult(result);
        Offer offer = getOfferByIdUseCase.getById(id);
        offer = offerUpdateUseCase.update(offerMapper.toUpdate(offerUpdateRequest, offer), id);
        final OfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }


    @PreAuthorize("hasAuthority('PERM_OFFER_UPDATE')")
    @Operation(summary = "Update Logo Offer")
    @PatchMapping(path = "/{id}/update-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OfferResponse> updatePhoto(@PathVariable("id") final Long id,
                                                     @RequestPart(value = "photo", required = false) final MultipartFile photo) throws IOException {
        final Offer offer = offerUpdatePhotoUseCase.updatePhoto(documentMapper.toDocument(photo), id);
        final OfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_UPDATE')")
    @Operation(summary = "Update AttachedFile")
    @PatchMapping(path = "/{id}/update-file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<OfferResponse> updateAttachedFile(@PathVariable("id") final Long id,
                                                            @RequestPart(value = "file", required = false) final MultipartFile file) throws IOException {
        final Offer offer = offerUpdateFileUseCase.updateAttachedFile(documentMapper.toDocument(file), id);
        final OfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_READ')")
    @Operation(summary = "Get All Offers")
    @GetMapping()
    public ResponseEntity<Page<OfferResponse>> getAll(@RequestParam("storeId") final Long storeId,
                                                      final Pageable pageable,
                                                      final AdminOfferFilter offerFilter) {
        final Page<Offer> allStoreOffers = getAllOfferUseCase.getAll(storeId, pageable, offerFilter);
        final Page<OfferResponse> offerResponses = allStoreOffers.map(offerMapper::toResponse);
        return ResponseEntity.ok(offerResponses);
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_READ')")
    @Operation(summary = "Get Offer By Offer Id")
    @GetMapping("/{id}")
    public ResponseEntity<OfferResponse> getById(@PathVariable("id") final Long id) {
        final Offer offer = getOfferByIdUseCase.getById(id);
        final OfferResponse offerResponse = offerMapper.toResponse(offer);
        return ResponseEntity.ok(offerResponse);
    }

    @PreAuthorize("hasAuthority('PERM_OFFER_READ')")
    @Operation(summary = "Search offer Details")
    @GetMapping("/search")
    public ResponseEntity<Page<OfferResponse>> searchOfferDetails(final Pageable pageable,
                                                                  @RequestParam(value = "Offer Name", required = false) final String offerName) {
        final Page<Offer> stores = getOfferByNameUseCase.getOfferByName(pageable, offerName);
        final Page<OfferResponse> offerResponses = stores.map(offerMapper::toResponse);
        return ResponseEntity.ok(offerResponses);
    }
}
