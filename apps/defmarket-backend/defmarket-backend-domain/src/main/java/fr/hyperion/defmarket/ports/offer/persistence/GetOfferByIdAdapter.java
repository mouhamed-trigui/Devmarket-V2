package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetOfferByIdAdapter {
    Offer getOfferById(Long offerId);
}
