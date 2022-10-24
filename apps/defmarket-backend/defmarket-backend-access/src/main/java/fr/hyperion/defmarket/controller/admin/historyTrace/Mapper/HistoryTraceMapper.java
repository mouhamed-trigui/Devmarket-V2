package fr.hyperion.defmarket.controller.admin.historyTrace.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.dto.request.historytrace.CreationHistoryTraceRequest;
import fr.hyperion.defmarket.dto.response.historytrace.HistoryTraceResponse;


@Mapper
public interface HistoryTraceMapper {
    HistoryTraceResponse toResponse(HistoryTrace historyTrace);


    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "id", ignore = true)
    HistoryTrace toEntity(CreationHistoryTraceRequest creationHistoryTraceRequest);
}
