package fr.hyperion.defmarket.data.redirection;

import fr.hyperion.defmarket.enumerated.JwtEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RedirectMapping {

    private JwtEnum action;
    private String uuid;
    private Long userId;
    private String token;
}
