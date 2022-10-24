package fr.hyperion.defmarket.ports.timetable.useCase;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface TimetableUpdateUseCase {
    Timetable update(Long timetableId, Timetable timetable);
}
