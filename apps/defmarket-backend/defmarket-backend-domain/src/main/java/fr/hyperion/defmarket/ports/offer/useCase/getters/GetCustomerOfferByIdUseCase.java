package fr.hyperion.defmarket.ports.offer.useCase.getters;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetCustomerOfferByIdUseCase {
    Offer getOfferById(Long offerId);
}
