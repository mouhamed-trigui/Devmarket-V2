package fr.hyperion.defmarket.controller.customer.store;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.customer.store.mapper.StoreCustomerMapper;
import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.dto.request.store.CustomerStoreFilterRequest;
import fr.hyperion.defmarket.dto.response.store.CustomerStoreDetailsResponse;
import fr.hyperion.defmarket.dto.response.store.StoreWithTimeTableResponse;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetAllLocalStoreUseCase;
import fr.hyperion.defmarket.ports.store.useCase.getters.GetStoreByIdWithOffersAndTimeTableUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_CUSTOMER + "/store")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_STORE')")
public class CustomerStoreController extends AbstractController {

    private final GetAllLocalStoreUseCase getAllLocalStoreUseCase;

    private final StoreCustomerMapper storeCustomerMapper;

    private final GetStoreByIdWithOffersAndTimeTableUseCase getStoreByIdWithOffersAndTimeTableUseCase;

    @PreAuthorize("hasAuthority('PERM_STORE_READ')")
    @Operation(summary = "Get All local Store with filter")
    @GetMapping("/page")
    public ResponseEntity<Page<StoreWithTimeTableResponse>> getAllStores(final Pageable pageable,
                                                                         final CustomerStoreFilterRequest customerStoreFilterRequest) {

        final CustomerStoreFilter customerStoreFilter = storeCustomerMapper
            .mapToCustomerStoreFilter(customerStoreFilterRequest);
        final Page<StoreWithTimeTable> allStoreOffers = getAllLocalStoreUseCase.getAllLocalStore(pageable,
            customerStoreFilter);
        final Page<StoreWithTimeTableResponse> storeResponses = allStoreOffers
            .map(storeCustomerMapper::mapToStoreWithTimeTableResponse);
        return ResponseEntity.ok(storeResponses);
    }

    @Operation(summary = "Get store by Id")
    @GetMapping("/{id}")
    public ResponseEntity<CustomerStoreDetailsResponse> getStoreById(@PathVariable final Long id) {
        final StoreWithOffersAndTimeTable store = getStoreByIdWithOffersAndTimeTableUseCase
            .getStoreByIdWithOffersAndTimeTable(id);
        final CustomerStoreDetailsResponse customerStoreDetailsResponse = storeCustomerMapper
            .mapToCustomerStoreDetailsResponse(store);
        return ResponseEntity.ok().body(customerStoreDetailsResponse);
    }
}
