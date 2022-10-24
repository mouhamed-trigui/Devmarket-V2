package fr.hyperion.defmarket.controller.customer.offer;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.customer.offer.mapper.OfferCustomerMapper;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.dto.response.offer.CustomerOfferResponse;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetCustomerOfferByIdUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_CUSTOMER + "/offer")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_OFFER')")
public class CustomerOfferController extends AbstractController {
    private final GetCustomerOfferByIdUseCase getCustomerOfferByIdUseCase;
    private final OfferCustomerMapper offerCustomerMapper;

    @PreAuthorize("hasAuthority('PERM_OFFER_READ')")
    @Operation(summary = "Get Offer By Offer Id")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerOfferResponse> getById(@PathVariable("id") final Long id) {
        final Offer offer = getCustomerOfferByIdUseCase.getOfferById(id);
        final CustomerOfferResponse customerOfferResponse = offerCustomerMapper.mapToCustomerOfferResponse(offer);
        return ResponseEntity.ok(customerOfferResponse);
    }
}
