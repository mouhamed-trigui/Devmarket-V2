package fr.hyperion.defmarket.enumerated.notification;

import lombok.Getter;

@Getter
public enum
NotifTextTraderEnum {
    BLOCKED("Votre compte a été bloqué à cause de "),
    UNBLOCKED("Votre compte a été débloqué "),
    VALIDATED("Votre compte a été validé "),
    UPDATE("Votre compte a été modifié"),
    REQUEST_INFO("Un administrateur a demandé plus d'information, veuillez vérifier votre email");
    private final String text;

    NotifTextTraderEnum(final String Text) {
        text = Text;
    }


}
