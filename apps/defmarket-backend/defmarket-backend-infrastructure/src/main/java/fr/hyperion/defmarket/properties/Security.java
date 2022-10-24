package fr.hyperion.defmarket.properties;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Security {
    @Valid
    @NotNull
    private Jwt jwt;

    @Valid
    @NotNull
    private DataConverter dataConverter;
}
