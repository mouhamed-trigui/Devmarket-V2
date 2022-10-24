package fr.hyperion.defmarket.ports.store.useCase;

import fr.hyperion.defmarket.data.store.Store;

public interface CreateStoreByAdminUseCase {
    Store createByAdmin(Store store, Long companyId);
}
