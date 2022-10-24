package fr.hyperion.defmarket.data;

import fr.hyperion.defmarket.enumerated.EntityTypeEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GlobalSearch {
    private Long id;
    private String text;
    private EntityTypeEnum entityType;
}
