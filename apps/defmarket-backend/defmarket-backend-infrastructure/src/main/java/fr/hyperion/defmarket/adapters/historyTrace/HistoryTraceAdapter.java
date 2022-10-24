package fr.hyperion.defmarket.adapters.historyTrace;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.historyTrace.mapper.HistoryTraceDBMapper;
import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.database.entity.HistoryTraceDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.repository.HistoryTraceRepository;
import fr.hyperion.defmarket.database.repository.UserRepository;
import fr.hyperion.defmarket.database.specification.HistoryTraceSpecification;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import fr.hyperion.defmarket.ports.historyTrace.persistence.CreateHistoryTraceAdapter;
import fr.hyperion.defmarket.ports.historyTrace.persistence.DeleteHistoryTraceAdapter;
import fr.hyperion.defmarket.ports.historyTrace.persistence.GetAllHistoryTraceAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HistoryTraceAdapter implements CreateHistoryTraceAdapter, DeleteHistoryTraceAdapter, GetAllHistoryTraceAdapter {

    private final HistoryTraceDBMapper historyTraceDBMapper;
    private final HistoryTraceRepository historyTraceRepository;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public HistoryTrace create(final HistoryTrace historyTrace, final Long ownerId) {
        final UserAccountDB userAccountDB = userRepository.getReferenceById(ownerId);
        HistoryTraceDB historyTraceDB = historyTraceDBMapper.toEntity(historyTrace);
        historyTraceDB.setUserAccountDB(userAccountDB);
        historyTraceDB = historyTraceRepository.save(historyTraceDB);
        return historyTraceDBMapper.toData(historyTraceDB);
    }

    @Override
    @Transactional
    public HistoryTrace delete(final Long id) {
        final HistoryTraceDB historyTraceDB = historyTraceRepository.findById(id).orElseThrow();
        historyTraceDB.setDeleted(true);
        return historyTraceDBMapper.toData(historyTraceDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HistoryTrace> getByOwnerId(final Long ownerId, final HistoryTypeEnum historyType, final Pageable pageable) {
        final Specification<HistoryTraceDB> spec = Specification.where(HistoryTraceSpecification.getByOwnerId(ownerId).and(HistoryTraceSpecification.getByHistoryType(historyType)))
            .and(HistoryTraceSpecification.notDeleted());

        final Page<HistoryTraceDB> allHistoryTrace = historyTraceRepository.findAll(spec, pageable);
        return allHistoryTrace.map(historyTraceDBMapper::toData);
    }
}
