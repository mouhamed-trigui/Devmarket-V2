package fr.hyperion.defmarket.enumerated.historyTrace;

import lombok.Getter;

@Getter
public enum HistoryTraceCompanyEnum {
    BLOCKED("L'entreprise %s a été bolqué "),
    UNBLOCKED("L'entreprise %s a été débloqué"),
    UPDATED("Les informations de l'entreprise %s a été modifiée "),
    VALIDATED("L'entreprise %s a été validé"),
    DELETED("L'entreprise %s a été supprimé"),
    CREATED("Une nouvelle entreprise  %s a été crée");

    private final String text;

    HistoryTraceCompanyEnum(final String Text) {
        text = Text;
    }
}
