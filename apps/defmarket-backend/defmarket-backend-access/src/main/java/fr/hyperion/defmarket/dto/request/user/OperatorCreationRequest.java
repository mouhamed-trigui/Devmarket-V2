package fr.hyperion.defmarket.dto.request.user;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;
import fr.hyperion.defmarket.validator.job.JobNotNullIfIsVeteran;

//@KnowUsThroughOtherValueNotNullIfKnowUsThroughEqualOther
@JobNotNullIfIsVeteran
public class OperatorCreationRequest {
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

    @NotNull
    public KnowUsThroughEnum knowUsThrough;

    public String knowUsThroughOtherValue;

    public Long jobId;
}


