package fr.hyperion.defmarket.data.timetable;

import java.time.DayOfWeek;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Timetable {
    private Long id;
    private DayOfWeek day;

    private boolean open24h;

    private List<WorkingTime> workingTime;

    private boolean active;
}
