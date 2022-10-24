package fr.hyperion.defmarket.enumerated.historyTrace;

import lombok.Getter;

@Getter
public enum HistoryTraceTraderEnum {

    VALIDATED("validated", "Le compte a été validé"),
    SEND_MORE_INFO_REQUEST("send_more_info_request", "Un administrateur a demandé plus d'information"),
    BLOCK_TRADER("block_trader", "Le compte a été bloqué"),
    UNBLOCK_TRADER("unblock_trader", "Le compte a été debloqué"),
    UPDATE_IDENTITY_TRADER("update_identity_trader", "Un administrateur a modifié le profile"),
    DELETE_TRADER("delete_trader", "Le compte a été supprimé");
    private final String name;
    private final String description;

    HistoryTraceTraderEnum(final String value, final String title) {
        name = value;
        description = title;
    }
}
