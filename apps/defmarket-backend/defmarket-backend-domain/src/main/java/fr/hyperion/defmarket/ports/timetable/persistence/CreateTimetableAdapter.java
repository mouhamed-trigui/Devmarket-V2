package fr.hyperion.defmarket.ports.timetable.persistence;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface CreateTimetableAdapter {
    Timetable create(Long storeId, Timetable timetable);
}
