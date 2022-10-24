package fr.hyperion.defmarket.properties;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Crisp {
    @NotBlank
    private String apiUrl;

    private CrispKeys pro;
}
