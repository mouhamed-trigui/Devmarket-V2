package fr.hyperion.defmarket.properties;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Jwt {
    @NotBlank
    private String keystoreLocation;
    @NotBlank
    private String keystorePassword;
    @NotBlank
    private String keyAlias;
    @NotBlank
    private String privateKeyPassphrase;

    @NotNull
    private long accessTokenValidity;

    @NotNull
    private long refreshTokenValidity;
}
