package fr.hyperion.defmarket.dto.request.user;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class EmailChangeRequest {
    @Email
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    @NotBlank(message = "Old E-mail must not be empty !")
    public String oldEmail;

    @Email
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    @NotBlank(message = "E-mail must not be empty !")
    public String newEmail;
}
