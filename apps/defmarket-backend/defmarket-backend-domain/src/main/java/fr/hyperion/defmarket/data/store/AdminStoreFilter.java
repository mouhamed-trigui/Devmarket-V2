package fr.hyperion.defmarket.data.store;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStoreFilter {
    private Boolean blocked;
    private Boolean validated;
    private Boolean hasModeration;
    private Boolean canBeValidated;
}
