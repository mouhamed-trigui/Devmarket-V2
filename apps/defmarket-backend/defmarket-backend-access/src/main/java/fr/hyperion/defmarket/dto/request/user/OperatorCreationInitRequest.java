package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;
import fr.hyperion.defmarket.validator.ValidPassword;

public class OperatorCreationInitRequest {
    @NotBlank
    @Email
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    public String email;

    @NotBlank(message = "Password must not be empty !")
    @ValidPassword
    public String password;
}
