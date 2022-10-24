package fr.hyperion.defmarket.dto.response.historytrace;


import java.time.Instant;

import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;

public class HistoryTraceResponse {

    public Long id;

    public String title;

    public String description;

    public Instant createdDate;

    public HistoryTypeEnum historyType;

}
