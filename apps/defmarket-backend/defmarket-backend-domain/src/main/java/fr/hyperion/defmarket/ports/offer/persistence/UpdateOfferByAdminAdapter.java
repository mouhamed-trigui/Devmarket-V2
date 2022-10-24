package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.Offer;

public interface UpdateOfferByAdminAdapter {
    Offer updateByAdmin(Offer offer, Long id);
}
