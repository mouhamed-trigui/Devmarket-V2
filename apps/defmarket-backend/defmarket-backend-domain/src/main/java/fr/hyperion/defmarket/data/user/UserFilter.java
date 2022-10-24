package fr.hyperion.defmarket.data.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFilter {
    private Boolean validated;
    private Boolean blocked;
    private Boolean canBeValidated;
    private Boolean moreInfoRequestedByAdmin;
}
