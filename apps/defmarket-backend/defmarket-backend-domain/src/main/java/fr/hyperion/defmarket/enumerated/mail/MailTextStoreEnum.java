package fr.hyperion.defmarket.enumerated.mail;


import lombok.Getter;

@Getter
public enum MailTextStoreEnum {
    BLOCKED("On a besoin te ton aide pour débloquer %s", ""),
    UNBLOCKED("Abracadabra, c’est réglé !", ""),
    UPDATED("Une petite modification", ""),
    VALIDATED("Tu l’as fait !", ""),
    DELETED(" %s a bien été supprimée", "");

    private final String subject;
    private final String text;

    MailTextStoreEnum(final String Subject, final String Text) {
        subject = Subject;
        text = Text;
    }
}
