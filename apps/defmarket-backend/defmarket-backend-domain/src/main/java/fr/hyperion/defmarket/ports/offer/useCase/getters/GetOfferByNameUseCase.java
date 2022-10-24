package fr.hyperion.defmarket.ports.offer.useCase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetOfferByNameUseCase {
    Page<Offer> getOfferByName(Pageable pageable, String offerName);
}
