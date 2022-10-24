package fr.hyperion.defmarket.dto.response.store;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StoreDetailedWithCompanyIdResponse extends StoreDetailedResponse {
    public Long companyId;
}
