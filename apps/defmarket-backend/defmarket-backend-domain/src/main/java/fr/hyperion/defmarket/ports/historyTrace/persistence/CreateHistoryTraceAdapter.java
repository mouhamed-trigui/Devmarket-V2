package fr.hyperion.defmarket.ports.historyTrace.persistence;


import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;

public interface CreateHistoryTraceAdapter {
    HistoryTrace create(HistoryTrace historyTrace, Long ownerId);
}
