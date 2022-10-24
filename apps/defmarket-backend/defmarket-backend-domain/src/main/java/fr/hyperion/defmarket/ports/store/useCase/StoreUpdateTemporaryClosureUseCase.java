package fr.hyperion.defmarket.ports.store.useCase;

import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.TemporaryClosure;

public interface StoreUpdateTemporaryClosureUseCase {
    Store updateTemporaryClosure(Long storeId, TemporaryClosure temporaryClosure);
}
