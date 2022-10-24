package fr.hyperion.defmarket.ports.timetable.persistence;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface UpdateTimetableAdapter {
    Timetable update(Long timetableId, Timetable timetable);
}
