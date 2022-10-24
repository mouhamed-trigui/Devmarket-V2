package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;

public class UserEmailRequest {

    @NotBlank(message = "Email must not be blank")
    public String email;
}
