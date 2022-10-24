package fr.hyperion.defmarket.ports.store.useCase;

import java.util.List;

import fr.hyperion.defmarket.data.store.Store;

public interface UpdateStoreByAdminUseCase {
    Store updateByAdmin(Store store, Long categoryId, List<Long> socialMediaToRemove, List<Long> phoneToRemove);
}
