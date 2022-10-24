package fr.hyperion.defmarket.dto.request.store;


import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.data.PersonalInfo;
import fr.hyperion.defmarket.data.internet.SocialMedia;
import fr.hyperion.defmarket.data.paymentMethod.PaymentMethod;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.dto.request.user.GeolocationRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;

public class StoreUpdateRequest {

    @JsonDeserialize(using = StringTrimDeserializer.class)
    @NotNull(message = "name must not be null !!")
    public String name;

    public String description;

    public AddressDetailedRequest address;

    public GeolocationRequest geolocation;

    public List<PhoneRequest> phoneList;

    public PersonalInfo<String> website;

    public String email;

    public boolean hideMyContacts;

    public List<SocialMedia> socialMedia;

    public List<Long> socialMediaToRemove;

    public List<Long> phoneToRemove;

    public Long categoryId;

    public List<PaymentMethod> paymentMethods;
}
