package fr.hyperion.defmarket.ports.historyTrace.persistence;


import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;

public interface DeleteHistoryTraceAdapter {
    HistoryTrace delete(Long id);
}
