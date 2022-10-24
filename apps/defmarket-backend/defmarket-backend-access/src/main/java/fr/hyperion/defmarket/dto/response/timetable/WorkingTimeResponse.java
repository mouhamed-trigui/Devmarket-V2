package fr.hyperion.defmarket.dto.response.timetable;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class WorkingTimeResponse {
    public Long id;

    @JsonFormat(pattern = "HH:mm")
    public LocalTime start;

    @JsonFormat(pattern = "HH:mm")
    public LocalTime end;
}
