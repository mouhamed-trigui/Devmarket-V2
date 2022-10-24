package fr.hyperion.defmarket.dto.request.user;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;

public class OperatorCreationByAdminRequest {
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

    public boolean veteran;

    public UserActivityEnum activity;

    public AddressDetailedRequest address;

    public PhoneRequest phone;

    public Long jobId;


}
