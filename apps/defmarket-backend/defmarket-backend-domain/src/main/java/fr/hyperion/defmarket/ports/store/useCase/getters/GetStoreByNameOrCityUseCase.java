package fr.hyperion.defmarket.ports.store.useCase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.store.Store;

public interface GetStoreByNameOrCityUseCase {
    Page<Store> getStoreByNameOrCity(Pageable pageable, String input);
}
