package fr.hyperion.defmarket.dto.request.timetable;

import java.time.DayOfWeek;
import java.util.List;

import fr.hyperion.defmarket.data.timetable.WorkingTime;

public class TimetableCRUDRequest {
    public Long id;

    public DayOfWeek day;

    public boolean open24h;

    public List<WorkingTime> workingTime;

    public boolean active;
}
