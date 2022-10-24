package fr.hyperion.defmarket.data.historyTrace;


import java.time.Instant;

import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class HistoryTrace {

    private Long id;

    private String title;

    private String description;

    private long userId;

    private Instant createdDate;

    private HistoryTypeEnum historyType;
}
