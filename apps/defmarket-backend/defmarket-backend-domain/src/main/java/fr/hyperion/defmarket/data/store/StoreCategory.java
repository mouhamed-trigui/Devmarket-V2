package fr.hyperion.defmarket.data.store;

import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StoreCategory {
    private Long id;
    private String name;
    private String description;
    private StoreTypeEnum storeType;
}
