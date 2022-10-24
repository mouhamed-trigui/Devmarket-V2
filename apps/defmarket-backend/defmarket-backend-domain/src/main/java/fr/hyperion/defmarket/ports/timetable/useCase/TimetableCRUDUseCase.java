package fr.hyperion.defmarket.ports.timetable.useCase;

import java.util.List;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface TimetableCRUDUseCase {
    List<Timetable> crud(Long storeId, List<Timetable> timetables);
}
