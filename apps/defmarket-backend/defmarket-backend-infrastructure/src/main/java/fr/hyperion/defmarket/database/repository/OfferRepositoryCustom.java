package fr.hyperion.defmarket.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.database.entity.OfferDB;

public interface OfferRepositoryCustom {

    Page<OfferDB> findByOfferByName(Pageable pageable, String offerName);


}
