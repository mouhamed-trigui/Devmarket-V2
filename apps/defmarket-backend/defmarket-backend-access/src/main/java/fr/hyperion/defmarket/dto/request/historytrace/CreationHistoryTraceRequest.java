package fr.hyperion.defmarket.dto.request.historytrace;


import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;

public class CreationHistoryTraceRequest {
    public long userId;
    public String title;
    public String description;
    public HistoryTypeEnum historyType;

}
