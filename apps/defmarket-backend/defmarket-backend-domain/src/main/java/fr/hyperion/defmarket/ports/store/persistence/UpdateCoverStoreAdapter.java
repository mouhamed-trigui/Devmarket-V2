package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.Store;

public interface UpdateCoverStoreAdapter {
    Store updateCover(Document cover, Long id);
}
