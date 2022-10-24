package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;

import fr.hyperion.defmarket.validator.ValidPassword;

public class PasswordChangeRequest {
    @NotBlank(message = "Old password must not be empty !")
    public String oldPassword;

    @NotBlank(message = "Password must not be empty !")
    @ValidPassword
    public String newPassword;
}
