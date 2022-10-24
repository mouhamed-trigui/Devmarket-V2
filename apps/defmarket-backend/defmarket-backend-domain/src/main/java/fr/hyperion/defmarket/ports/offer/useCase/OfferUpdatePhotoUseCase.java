package fr.hyperion.defmarket.ports.offer.useCase;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;

public interface OfferUpdatePhotoUseCase {
    Offer updatePhoto(Document document, Long offerId);
}
