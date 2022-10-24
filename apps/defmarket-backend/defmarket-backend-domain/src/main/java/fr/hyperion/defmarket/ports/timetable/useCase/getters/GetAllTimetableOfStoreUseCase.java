package fr.hyperion.defmarket.ports.timetable.useCase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.timetable.Timetable;

public interface GetAllTimetableOfStoreUseCase {
    List<Timetable> getAllTimetableOfStore(Long storeId);
    
}
