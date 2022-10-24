package fr.hyperion.defmarket.controller.customer.timetable.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.data.timetable.WorkingTime;
import fr.hyperion.defmarket.dto.response.timetable.TimetableResponse;
import fr.hyperion.defmarket.dto.response.timetable.WorkingTimeResponse;

@Mapper
public interface CustomerTimetableMapper {
	
	TimetableResponse mapToTimetableResponse(Timetable timetable);

    List<TimetableResponse> mapToTimetableResponses(List<Timetable> timetables);
    
    WorkingTimeResponse mapToWorkingTimeResponse(WorkingTime workingTime);

    List<WorkingTimeResponse> mapToWorkingTimeResponses(List<WorkingTime> workingTime);

}
