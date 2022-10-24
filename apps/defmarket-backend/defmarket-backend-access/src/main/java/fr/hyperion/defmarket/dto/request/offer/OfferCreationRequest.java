package fr.hyperion.defmarket.dto.request.offer;

import java.io.Serializable;
import java.time.Instant;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import fr.hyperion.defmarket.validator.max_value.ValidOfferValue;
import fr.hyperion.defmarket.validator.timeLine.ValidTimeLine;
import lombok.Data;

@ValidTimeLine(start = "startOfOffer", end = "endOfOffer")
@ValidOfferValue
@Data
public class OfferCreationRequest implements Serializable {

    public String value;

    @NotNull
    public Instant startOfOffer;

    public Instant endOfOffer;

    public OfferTypeEnum offerType;

    @NotNull
    public ThemeTypeEnum themeType;

    @NotEmpty
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String title;

    public String description;
    public OfferCategoryEnum offerCategory;

    public String minOfferValue;
    public String midOfferValue;
    public String maxOfferValue;
}
