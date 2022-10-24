package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetOneOfferAdapter {
    Offer getById(Long offerId);
}
