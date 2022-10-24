package fr.hyperion.defmarket.ports.offer.useCase;

import fr.hyperion.defmarket.data.offer.Offer;

public interface OfferUpdateUseCase {
    Offer update(Offer offer, Long id);

}
