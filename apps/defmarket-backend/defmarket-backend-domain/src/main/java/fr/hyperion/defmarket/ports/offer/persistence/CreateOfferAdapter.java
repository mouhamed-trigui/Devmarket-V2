package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.Offer;

public interface CreateOfferAdapter {
    Offer create(Offer offer, Long storeId);
}
