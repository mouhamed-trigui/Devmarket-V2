package fr.hyperion.defmarket.enumerated.mail;

import lombok.Getter;

@Getter
public enum MailTextOfferEnum {
    BLOCKED("On a besoin de toi…", ""),
    UNBLOCKED("C’est réglé !", ""),
    UPDATED("Une petite modification", ""),
    VALIDATED("Tu l’as fait : ton offre est validée !", ""),
    DELETED("Ton offre a bien été supprimée", "");

    private final String subject;
    private final String text;

    MailTextOfferEnum(final String Subject, final String Text) {
        subject = Subject;
        text = Text;
    }
}
