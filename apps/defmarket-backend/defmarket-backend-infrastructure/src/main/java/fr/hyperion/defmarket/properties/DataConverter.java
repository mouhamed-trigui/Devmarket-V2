package fr.hyperion.defmarket.properties;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DataConverter {
    @NotBlank
    private String key;

    @NotBlank
    private String algorithm;

    @NotBlank
    private String encryptionMode;
}
