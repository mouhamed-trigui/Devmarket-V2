package fr.hyperion.defmarket.adapters.timetable.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.timetable.WorkingTime;
import fr.hyperion.defmarket.database.entity.WorkingTimeDB;

@Mapper
public interface WorkingTimeDBMapper {

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "timetable", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    WorkingTimeDB toDB(WorkingTime workingTime);

    WorkingTime toWorkingTime(WorkingTimeDB workingTimeDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "timetable", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    void update(WorkingTime workingTime, @MappingTarget WorkingTimeDB workingTimeDB);
}
