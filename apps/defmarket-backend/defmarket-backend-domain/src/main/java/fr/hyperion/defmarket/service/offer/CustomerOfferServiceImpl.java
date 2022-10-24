package fr.hyperion.defmarket.service.offer;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.ports.offer.persistence.GetOneOfferAdapter;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetCustomerOfferByIdUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class CustomerOfferServiceImpl implements GetCustomerOfferByIdUseCase {
    private final GetOneOfferAdapter getOneOfferAdapter;

    @Override
    public Offer getOfferById(final Long offerId) {
        return getOneOfferAdapter.getById(offerId);
    }
}

