package fr.hyperion.defmarket.dto.request.user;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.data.user.ValidationMode;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.dto.request.user.contact.AddressRequest;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;
import fr.hyperion.defmarket.validator.ValidPassword;

public class UserCreationRequest {
    @NotBlank
    @Email
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    public String email;

    @NotBlank(message = "Password must not be empty !")
    @ValidPassword
    public String password;

    @NotNull
    public KnowUsThroughEnum knowUsThrough;
    public String knowUsThroughOtherValue;

    @NotEmpty
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String firstName;

    public GenderEnum gender;

    @NotNull
    public UserActivityEnum activity;

    @NotNull
    public Long jobId;

    public ValidationMode validationMode;
    
    @Valid
    @NotNull(message = "add the user address")
    public AddressRequest address;
}


