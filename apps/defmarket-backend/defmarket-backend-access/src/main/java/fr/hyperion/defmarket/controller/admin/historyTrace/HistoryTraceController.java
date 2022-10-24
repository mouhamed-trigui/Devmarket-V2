package fr.hyperion.defmarket.controller.admin.historyTrace;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.admin.historyTrace.Mapper.HistoryTraceMapper;
import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.dto.request.historytrace.CreationHistoryTraceRequest;
import fr.hyperion.defmarket.dto.response.historytrace.HistoryTraceResponse;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import fr.hyperion.defmarket.ports.historyTrace.useCase.CreateHistoryTraceUseCase;
import fr.hyperion.defmarket.ports.historyTrace.useCase.DeleteHistoryTraceUseCase;
import fr.hyperion.defmarket.ports.historyTrace.useCase.getters.GetAllHistoryTraceUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_ADMIN + "/history-trace")
@RequiredArgsConstructor
public class HistoryTraceController extends AbstractController {

    private final GetAllHistoryTraceUseCase getAllHistoryTraceUseCase;
    private final DeleteHistoryTraceUseCase deleteHistoryTraceUseCase;
    private final CreateHistoryTraceUseCase createHistoryTraceUseCase;
    private final HistoryTraceMapper historyTraceMapper;

    @Operation(summary = "Get All History Trace ")
    @GetMapping
    public ResponseEntity<Page<HistoryTraceResponse>> getAll(@RequestParam final Long userId, final HistoryTypeEnum historyType, final Pageable pageable) {

        final Page<HistoryTrace> allHistoryTrace = getAllHistoryTraceUseCase.getAll(userId, historyType, pageable);
        final Page<HistoryTraceResponse> historyTraceResponses = allHistoryTrace.map(historyTraceMapper::toResponse);
        return ResponseEntity.ok(historyTraceResponses);
    }

    @Operation(summary = "Delete History Trace By Id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        deleteHistoryTraceUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Create History Trace")
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody final CreationHistoryTraceRequest creationHistoryTraceRequest) {
        final HistoryTrace historyTrace = historyTraceMapper.toEntity(creationHistoryTraceRequest);
        createHistoryTraceUseCase.create(historyTrace, historyTrace.getUserId());
        return ResponseEntity.accepted().build();
    }
}
