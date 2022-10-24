package fr.hyperion.defmarket.controller.pro.timetable.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.data.timetable.WorkingTime;
import fr.hyperion.defmarket.dto.request.timetable.TimetableCRUDRequest;
import fr.hyperion.defmarket.dto.response.timetable.TimetableResponse;
import fr.hyperion.defmarket.dto.response.timetable.WorkingTimeResponse;

@Mapper
public interface TimetableMapper {

    Timetable toTimetable(TimetableCRUDRequest timetableCRUDRequest);

    List<Timetable> toTimetable(List<TimetableCRUDRequest> timetableCRUDRequest);

    TimetableResponse toResponse(Timetable timetable);

    List<TimetableResponse> toResponse(List<Timetable> timetables);

    WorkingTimeResponse toWorkingTimeResponse(WorkingTime workingTime);

    List<WorkingTimeResponse> toWorkingTimeResponse(List<WorkingTime> workingTime);
}
