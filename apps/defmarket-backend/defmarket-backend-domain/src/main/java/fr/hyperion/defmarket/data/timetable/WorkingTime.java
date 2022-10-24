package fr.hyperion.defmarket.data.timetable;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkingTime {
    private Long id;

    private LocalTime start;
    private LocalTime end;

    public boolean isInWorkingTime(final LocalTime time) {
        return time.isAfter(start) && time.isBefore(end);
    }
}
