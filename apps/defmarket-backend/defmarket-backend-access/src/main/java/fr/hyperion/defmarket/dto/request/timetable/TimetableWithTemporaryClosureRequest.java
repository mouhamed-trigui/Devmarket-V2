package fr.hyperion.defmarket.dto.request.timetable;

import java.util.List;

public class TimetableWithTemporaryClosureRequest {
    public List<TimetableCRUDRequest> timetables;
    public TemporaryClosureRequest temporaryClosure;
}
