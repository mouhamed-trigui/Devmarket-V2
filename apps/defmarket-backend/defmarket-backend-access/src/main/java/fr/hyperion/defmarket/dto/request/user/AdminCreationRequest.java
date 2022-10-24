package fr.hyperion.defmarket.dto.request.user;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.enumerated.GenderEnum;

public class AdminCreationRequest {
    @NotBlank
    @Email
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    public String email;


    @NotBlank
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String firstName;

    @NotBlank
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String lastName;

    public LocalDate birthday;

    public GenderEnum gender;
}
