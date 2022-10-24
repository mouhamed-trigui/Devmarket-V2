package fr.hyperion.defmarket.ports.offer.useCase.getters;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;

public interface GetNexOfferUseCase {
    Offer getNextOffer(final Long currentOfferId, final AdminOfferFilter adminOfferFilter, final boolean desc);
}
