package fr.hyperion.defmarket.enumerated.historyTrace;

import lombok.Getter;

@Getter
public enum HistoryTraceOfferEnum {
    BLOCKED("Blocage de l'offre %s pour les raisons suivantes: %s "),
    UNBLOCKED("Déblocage de l'offre %s"),
    UPDATED("Les informations de l'offre %s a été modifiée "),
    VALIDATED("Validation de l'offre %s"),
    DELETED("Suppression de l'offre %s"),
    CREATED("Création d'un nouveau offre %s");
    private final String text;

    HistoryTraceOfferEnum(final String Text) {
        text = Text;
    }
}
