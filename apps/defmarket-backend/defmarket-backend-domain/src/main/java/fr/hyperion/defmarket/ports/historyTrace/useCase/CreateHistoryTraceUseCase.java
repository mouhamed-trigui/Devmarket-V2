package fr.hyperion.defmarket.ports.historyTrace.useCase;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;

public interface CreateHistoryTraceUseCase {
    HistoryTrace create(HistoryTrace historyTrace, Long ownerId);
}
