package fr.hyperion.defmarket.data.roles;

import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class DefaultRole extends Role {
    private UserTypeEnum target;
}
