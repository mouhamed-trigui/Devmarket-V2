package fr.hyperion.defmarket.dto.request.user.contact;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;

public class AddressRequest {

	@NotBlank(message = "pays can't be null")
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String country;
    @NotBlank(message = "departement can't be null")
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String department;
    @NotBlank(message = "city can't be null")
	@JsonDeserialize(using = StringTrimDeserializer.class)
    public String city;
    @NotBlank(message = "ZipCode can't be null")
	@JsonDeserialize(using = StringTrimDeserializer.class)
    public String zipCode;

    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String street;
}
