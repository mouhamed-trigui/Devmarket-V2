package fr.hyperion.defmarket.ports.offer.useCase.getters;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;

public interface GetOffersCountUseCase {
    Long getOffersCount(AdminOfferFilter offerFilter);
}
