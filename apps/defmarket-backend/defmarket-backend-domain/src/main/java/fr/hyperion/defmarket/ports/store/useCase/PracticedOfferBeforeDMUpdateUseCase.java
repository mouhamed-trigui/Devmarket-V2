package fr.hyperion.defmarket.ports.store.useCase;

import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;

public interface PracticedOfferBeforeDMUpdateUseCase {
    Store updatePracticedOfferBeforeDM(Long id, PracticedOfferBeforeDM practicedOfferBeforeDM);

}
