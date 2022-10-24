package fr.hyperion.defmarket.ports.offer.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.offer.Offer;

public interface GetOfferByNameAdapter {
    Page<Offer> getOfferByName(Pageable pageable, String offerName);
}
