package fr.hyperion.defmarket.ports.offer.useCase;

import fr.hyperion.defmarket.data.offer.Offer;

public interface OfferFactoryUseCase {
    Offer create(Offer offer, Long storeId);
}
