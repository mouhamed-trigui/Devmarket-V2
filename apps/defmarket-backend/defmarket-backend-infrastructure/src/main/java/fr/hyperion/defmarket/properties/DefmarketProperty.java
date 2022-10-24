package fr.hyperion.defmarket.properties;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Validated
@NoArgsConstructor
@ConfigurationProperties(prefix = "defmarket", ignoreUnknownFields = false)
public class DefmarketProperty {
    @NotBlank
    private String hostname;
    @NotNull
    private String frontEndLink;
    @NotNull
    private String frontVersion;
    @NotBlank
    private String frontAccess;
    @Valid
    @NotNull
    private Security security;

    private Files files;

    private Geoapify geoapify;

    @Valid
    private Crisp crisp;

    @Valid
    private ClacDesDoigts clacDesDoigts;
}

