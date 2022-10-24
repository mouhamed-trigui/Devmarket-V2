package fr.hyperion.defmarket.ports.timetable.persistence;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface GetTimetableByIdAdapter {
    Timetable getById(Long id);
}
