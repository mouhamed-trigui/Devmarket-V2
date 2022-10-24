package fr.hyperion.defmarket.ports.store.useCase;

import java.io.IOException;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.Store;

public interface StoreUpdateCoverUseCase {
    Store updateCover(Document file, Long id) throws IOException;
}
