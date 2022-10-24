package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;

public interface GetNexOfferAdapter {
    Offer getNextOffer(final Long currentOfferId, final AdminOfferFilter adminOfferFilter, final boolean desc);
}
