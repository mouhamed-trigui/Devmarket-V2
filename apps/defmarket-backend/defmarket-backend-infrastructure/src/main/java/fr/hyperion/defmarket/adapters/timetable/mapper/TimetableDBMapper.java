package fr.hyperion.defmarket.adapters.timetable.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.TimetableDB;

@Mapper(uses = {WorkingTimeDBMapper.class})
public interface TimetableDBMapper {
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "workingTime", ignore = true)
    TimetableDB toDB(Timetable timetable, StoreDB store);

    Timetable toTimetable(TimetableDB timetableDB);

    List<Timetable> toTimetable(List<TimetableDB> timetableList);

    @Mapping(target = "store", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "day", ignore = true)
    @Mapping(target = "workingTime", ignore = true)
    TimetableDB update(Timetable timetable, @MappingTarget TimetableDB timetableDB);
}
