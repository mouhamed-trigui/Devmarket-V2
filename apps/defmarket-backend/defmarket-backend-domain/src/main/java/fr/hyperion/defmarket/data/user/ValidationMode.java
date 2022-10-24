package fr.hyperion.defmarket.data.user;

import fr.hyperion.defmarket.enumerated.company.ValidationModeTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationMode {
    private ValidationModeTypeEnum type;
    private String value;
}
