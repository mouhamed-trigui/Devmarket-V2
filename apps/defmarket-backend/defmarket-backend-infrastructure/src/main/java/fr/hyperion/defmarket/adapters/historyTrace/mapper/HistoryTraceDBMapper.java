package fr.hyperion.defmarket.adapters.historyTrace.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.adapters.user.mapper.UserDBMapper;
import fr.hyperion.defmarket.data.historyTrace.HistoryTrace;
import fr.hyperion.defmarket.database.entity.HistoryTraceDB;

@Mapper(uses = {UserDBMapper.class})
public interface HistoryTraceDBMapper {


    @Mapping(target = "userId", source = "userAccountDB.id")
    HistoryTrace toData(HistoryTraceDB historyTraceDB);

    List<HistoryTrace> toData(List<HistoryTraceDB> historyTraceDBS);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "userAccountDB", ignore = true)
    HistoryTraceDB toEntity(HistoryTrace historyTrace);
}
