package fr.hyperion.defmarket.ports.historyTrace.persistence;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;

public interface GetAllHistoryTraceAdapter {
    Page<HistoryTrace> getByOwnerId(Long ownerId, HistoryTypeEnum historyType, Pageable pageable);
}
