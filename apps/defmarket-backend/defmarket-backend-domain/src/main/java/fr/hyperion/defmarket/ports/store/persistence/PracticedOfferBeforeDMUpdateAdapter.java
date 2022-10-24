package fr.hyperion.defmarket.ports.store.persistence;


import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;

public interface PracticedOfferBeforeDMUpdateAdapter {
    Store updatePracticedOfferBeforeDM(Long id, PracticedOfferBeforeDM practicedOfferBeforeDM);
}
