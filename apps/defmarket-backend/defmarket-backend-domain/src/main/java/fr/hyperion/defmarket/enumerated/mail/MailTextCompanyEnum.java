package fr.hyperion.defmarket.enumerated.mail;


import lombok.Getter;

@Getter
public enum MailTextCompanyEnum {
    BLOCKED("On a besoin de toi…"),
    UNBLOCKED("Abracadabra, c’est réglé !"),
    UPDATED("Une petite modification…"),
    VALIDATED("Abracadabra… Ton entreprise est validée !"),
    DELETED(" %s a bien été supprimée");

    private final String subject;

    MailTextCompanyEnum(final String Subject) {
        subject = Subject;
    }
}
