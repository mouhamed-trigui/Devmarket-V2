package fr.hyperion.defmarket.ports.offer.useCase.getters;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetOfferByIdUseCase {
    Offer getById(Long offerId);
}
