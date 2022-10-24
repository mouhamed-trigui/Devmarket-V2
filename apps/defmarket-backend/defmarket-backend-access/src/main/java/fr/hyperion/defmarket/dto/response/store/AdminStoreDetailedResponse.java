package fr.hyperion.defmarket.dto.response.store;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class AdminStoreDetailedResponse extends StoreDetailedResponse {
    public boolean blocked;
    public boolean validatedByAdmin;
}
