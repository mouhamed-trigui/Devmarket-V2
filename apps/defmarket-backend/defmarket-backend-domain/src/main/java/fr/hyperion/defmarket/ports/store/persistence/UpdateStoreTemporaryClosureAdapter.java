package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.TemporaryClosure;

public interface UpdateStoreTemporaryClosureAdapter {
    Store updateTemporaryClosure(Long storeId, TemporaryClosure temporaryClosure);
}
