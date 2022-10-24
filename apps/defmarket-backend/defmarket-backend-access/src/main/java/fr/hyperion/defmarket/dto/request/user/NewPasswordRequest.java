package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;

import fr.hyperion.defmarket.validator.ValidPassword;

public class NewPasswordRequest {

    @NotBlank(message = "NewPassword must not be blank")
    @ValidPassword
    public String newPassword;
}
