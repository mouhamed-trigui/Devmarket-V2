package fr.hyperion.defmarket.data.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyFilter {
    private Boolean validated;
    private Boolean blocked;
    private Boolean canBeValidated;
}
