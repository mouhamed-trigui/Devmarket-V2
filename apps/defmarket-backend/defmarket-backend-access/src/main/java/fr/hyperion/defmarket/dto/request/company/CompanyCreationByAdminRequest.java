package fr.hyperion.defmarket.dto.request.company;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class CompanyCreationByAdminRequest extends CompanyCreationRequest {
    public Long ownerId;
}
