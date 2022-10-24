package fr.hyperion.defmarket.ports.historyTrace.useCase.getters;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;

public interface GetAllHistoryTraceUseCase {
    Page<HistoryTrace> getAll(Long ownerId, HistoryTypeEnum historyType, Pageable pageable);

}
