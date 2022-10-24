package fr.hyperion.defmarket.service.historyTrace;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import fr.hyperion.defmarket.ports.historyTrace.persistence.CreateHistoryTraceAdapter;
import fr.hyperion.defmarket.ports.historyTrace.persistence.DeleteHistoryTraceAdapter;
import fr.hyperion.defmarket.ports.historyTrace.persistence.GetAllHistoryTraceAdapter;
import fr.hyperion.defmarket.ports.historyTrace.useCase.CreateHistoryTraceUseCase;
import fr.hyperion.defmarket.ports.historyTrace.useCase.DeleteHistoryTraceUseCase;
import fr.hyperion.defmarket.ports.historyTrace.useCase.getters.GetAllHistoryTraceUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class HistoryTraceServiceImpl implements GetAllHistoryTraceUseCase, DeleteHistoryTraceUseCase, CreateHistoryTraceUseCase {

    private final GetAllHistoryTraceAdapter getAllHistoryTraceAdapter;
    private final DeleteHistoryTraceAdapter deleteHistoryTraceAdapter;
    private final CreateHistoryTraceAdapter createHistoryTraceAdapter;

    @Override
    public Page<HistoryTrace> getAll(final Long ownerId, final HistoryTypeEnum historyType, final Pageable pageable) {
        return getAllHistoryTraceAdapter.getByOwnerId(ownerId, historyType, pageable);
    }

    @Override
    public HistoryTrace delete(final Long id) {
        final HistoryTrace delete = deleteHistoryTraceAdapter.delete(id);
        log.info("HistoryTrace with id {} has been deleted", id);
        return delete;
    }

    @Override
    public HistoryTrace create(final HistoryTrace historyTrace, final Long ownerId) {
        final HistoryTrace createHistoryTrace = createHistoryTraceAdapter.create(historyTrace, ownerId);
        log.info("HistoryTrace id {} has been created", historyTrace.getId());
        return createHistoryTrace;
    }
}
