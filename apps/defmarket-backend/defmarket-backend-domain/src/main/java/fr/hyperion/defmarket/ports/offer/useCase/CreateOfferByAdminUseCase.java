package fr.hyperion.defmarket.ports.offer.useCase;

import fr.hyperion.defmarket.data.offer.Offer;

public interface CreateOfferByAdminUseCase {
    Offer createByAdmin(Offer offer, Long storeId);
}
