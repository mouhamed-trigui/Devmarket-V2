package fr.hyperion.defmarket.ports.offer.persistence;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;

public interface UpdatePhotoOfferAdapter {
    Offer updatePhoto(Document photo, Long id);
}
