package fr.hyperion.defmarket.enumerated.mail;


import lombok.Getter;

@Getter
public enum


MailTextTraderEnum {
    BLOCKED("On a besoin de toi…", ""),
    UNBLOCKED("C’est réglé !", ""),
    UPDATED("Petite modification sur ton profil", ""),
    VALIDATED("Tu ne rêves pas, ton compte est bien validé", ""),
    DELETED("Ton compte est bien supprimé", ""),
    FORGETPASSWORD("Oops… mais où est ton mot de passe ?", ""),
    SENDEMAILWITHTOKEN("Tu y es presque… Valide ton mail, tu vas cartonner !", ""),
    REQUESTDELETE("Tellement triste… tu nous quitte déjà ?", ""),
    CREATEBYADMIN("Abracadabra … ton compte est créé !", ""),
    CHNAGEPASSWORD("Suppression de compte Defmarket Pro ", ""),
    REQUESTCHNAGEEMAIL("Un mail tout propre !", "");

    private final String subject;
    private final String text;

    MailTextTraderEnum(final String Subject, final String Text) {
        subject = Subject;
        text = Text;
    }
}
