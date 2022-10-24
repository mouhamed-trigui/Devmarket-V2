package fr.hyperion.defmarket.dto.request.store;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;

public class StoreCreationRequest implements Serializable {

    @NotNull
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String name;

    public String description;

    public String website;
    public Address address;
    public StoreCategory category;

    public StoreTypeEnum storeType;

    public boolean eCommerceAndPhysicalStore = false;

    public PracticedOfferBeforeDM practicedOfferBeforeDM;

    @JsonIgnore
    @JsonIgnoreProperties
    public Document logo;

    @JsonIgnore
    @JsonIgnoreProperties
    public Document cover;

    public Long companyId;
}
