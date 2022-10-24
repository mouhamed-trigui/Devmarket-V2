package fr.hyperion.defmarket.ports.store.useCase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;

public interface GetAllStoreOfCompanyUseCase {
    List<Store> getAll(Long companyId);

}
