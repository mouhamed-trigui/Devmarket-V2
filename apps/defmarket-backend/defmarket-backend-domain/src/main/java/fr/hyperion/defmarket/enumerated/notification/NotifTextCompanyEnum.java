package fr.hyperion.defmarket.enumerated.notification;

import lombok.Getter;

@Getter
public enum
NotifTextCompanyEnum {
    BLOCKED("Blocage de l'entreprise %s"),
    UNBLOCKED("Déblocage de l'entreprise %s"),
    UPDATED("Les informations de votre entreprise %s ont été modifiée "),
    VALIDATED("Validation de l'entreprise %s"),
    DELETED("Suppression de l'entreprise %s");
    private final String text;

    NotifTextCompanyEnum(final String Text) {
        text = Text;
    }

}
