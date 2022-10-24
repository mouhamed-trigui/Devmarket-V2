package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ExpoTokenRequest {
    @NotNull
    @NotBlank
    public String expoToken;
}
