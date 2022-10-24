package fr.hyperion.defmarket.ports.timetable.useCase;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface TimetableFactoryUseCase {
    Timetable create(Long storeId, Timetable timetable);
}
