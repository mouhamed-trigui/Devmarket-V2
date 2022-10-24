package fr.hyperion.defmarket.ports.offer.useCase.getters;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.offer.AdminOfferFilter;
import fr.hyperion.defmarket.data.offer.Offer;


public interface GetAllOfferUseCase {
    Page<Offer> getAll(Long storeId, Pageable pageable, AdminOfferFilter offerFilter);

    List<Offer> getAll(Long storeId);
}
