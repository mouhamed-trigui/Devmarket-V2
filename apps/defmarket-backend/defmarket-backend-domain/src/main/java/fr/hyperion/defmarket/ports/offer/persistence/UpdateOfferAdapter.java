package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.Offer;

public interface UpdateOfferAdapter {
    Offer update(Offer offer, Long id);

}
