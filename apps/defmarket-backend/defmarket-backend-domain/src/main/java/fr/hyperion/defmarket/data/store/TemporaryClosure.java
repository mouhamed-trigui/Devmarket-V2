package fr.hyperion.defmarket.data.store;

import fr.hyperion.defmarket.enumerated.company.ClosureTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TemporaryClosure {
    private ClosureTypeEnum closureType;
    private String reason;
}
