package fr.hyperion.defmarket.enumerated.historyTrace;

import lombok.Getter;

@Getter
public enum HistoryTraceStoreEnum {
    BLOCKED("Blocage de la boutique %s a cause de %s "),
    UNBLOCKED("Déblocage de la boutique %s"),
    UPDATED("Les informations de la boutique %S a été modifiée"),
    VALIDATED("Validation de la boutique %s"),
    DELETED("Suppression de la boutique %S"),
    CREATED("Création d'un nouveau boutique %s");
    private final String text;

    HistoryTraceStoreEnum(final String Text) {
        text = Text;
    }
}
