package fr.hyperion.defmarket.dto.response.timetable;

import java.time.DayOfWeek;
import java.util.List;

public class TimetableResponse {
    public Long id;
    public DayOfWeek day;

    public boolean open24h;

    public List<WorkingTimeResponse> workingTime;

    public boolean active;
}
