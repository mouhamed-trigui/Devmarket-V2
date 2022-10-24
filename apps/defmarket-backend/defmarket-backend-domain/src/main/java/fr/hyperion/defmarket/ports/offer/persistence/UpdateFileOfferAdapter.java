package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;

public interface UpdateFileOfferAdapter {
    Offer updateAttachedFile(Document attachedFile, Long id);
}
