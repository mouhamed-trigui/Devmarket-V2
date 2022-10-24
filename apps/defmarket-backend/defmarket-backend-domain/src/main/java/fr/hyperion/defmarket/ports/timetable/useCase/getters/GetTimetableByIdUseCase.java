package fr.hyperion.defmarket.ports.timetable.useCase.getters;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface GetTimetableByIdUseCase {
    Timetable getById(Long id);
}
