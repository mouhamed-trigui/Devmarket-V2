package fr.hyperion.defmarket.ports.timetable.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface GetAllTimetableAdapter {
    List<Timetable> getAllTimetableOfStore(Long storeId);
    
    List<Timetable> getAllTimetableOfStore(Long storeId, Boolean timetableStatus);
}
