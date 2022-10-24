package fr.hyperion.defmarket.enumerated.notification;

import lombok.Getter;

@Getter
public enum
NotifTextStoreEnum {
    BLOCKED("Blocage de la boutique %s à cause de %s "),
    UNBLOCKED("Déblocage de la boutique %s"),
    UPDATED("Les informations de votre boutique %s ont été modifiée"),
    VALIDATED("Validation de la boutique %s"),
    DELETED("Suppression de la boutique %s");
    private final String text;

    NotifTextStoreEnum(final String Text) {
        text = Text;
    }

}
