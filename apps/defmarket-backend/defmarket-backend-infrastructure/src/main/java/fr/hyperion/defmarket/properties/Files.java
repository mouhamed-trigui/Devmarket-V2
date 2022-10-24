package fr.hyperion.defmarket.properties;

import javax.validation.constraints.NotBlank;

import org.springframework.validation.annotation.Validated;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Validated
public class Files {
    @NotBlank
    private String visible;
    @NotBlank
    private String secured;
}
