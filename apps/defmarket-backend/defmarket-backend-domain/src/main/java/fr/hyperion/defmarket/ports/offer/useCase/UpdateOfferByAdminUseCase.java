package fr.hyperion.defmarket.ports.offer.useCase;

import fr.hyperion.defmarket.data.offer.Offer;

public interface UpdateOfferByAdminUseCase {
    Offer updateByAdmin(Offer offer, Long id);

}
