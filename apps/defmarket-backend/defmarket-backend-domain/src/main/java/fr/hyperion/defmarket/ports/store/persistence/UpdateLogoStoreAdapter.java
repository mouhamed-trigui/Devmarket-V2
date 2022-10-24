package fr.hyperion.defmarket.ports.store.persistence;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.Store;

public interface UpdateLogoStoreAdapter {
    Store updateLogo(Document logo, Long storeId);
}
