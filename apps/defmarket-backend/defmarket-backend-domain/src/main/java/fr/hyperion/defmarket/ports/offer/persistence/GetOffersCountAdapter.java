package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;

public interface GetOffersCountAdapter {
    Long getOffersCount(AdminOfferFilter offerFilter);
}
