package fr.hyperion.defmarket.ports.historyTrace.useCase;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;

public interface DeleteHistoryTraceUseCase {
    HistoryTrace delete(Long id);
}
