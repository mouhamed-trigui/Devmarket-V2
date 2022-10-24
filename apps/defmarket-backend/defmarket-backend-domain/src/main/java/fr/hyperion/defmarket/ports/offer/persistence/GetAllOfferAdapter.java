package fr.hyperion.defmarket.ports.offer.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;


public interface GetAllOfferAdapter {
    Page<Offer> getAllByFilter(Long storeId, Pageable pageable, AdminOfferFilter offerFilter);

    Page<Offer> getAll(Long storeId, Pageable pageable);
}
