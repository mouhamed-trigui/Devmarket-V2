package fr.hyperion.defmarket.enumerated.notification;

import lombok.Getter;

@Getter
public enum NotifTextOfferEnum {
    BLOCKED("Blocage de l'offre %s pour les raisons suivantes: %s "),
    UNBLOCKED("Déblocage de l'offre %s"),
    UPDATED("Les informations de votre offre %s ont été modifiée "),
    VALIDATED("Validation de l'offre %s"),
    DELETED("Suppression de l'offre %s");
    private final String text;

    NotifTextOfferEnum(final String Text) {
        text = Text;
    }

}
