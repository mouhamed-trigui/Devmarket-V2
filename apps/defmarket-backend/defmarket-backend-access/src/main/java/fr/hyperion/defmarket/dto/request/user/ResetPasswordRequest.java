package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;

import fr.hyperion.defmarket.validator.ValidPassword;

public class ResetPasswordRequest {

    @NotBlank(message = "Password must not be empty !")
    @ValidPassword
    public String newPassword;

}
