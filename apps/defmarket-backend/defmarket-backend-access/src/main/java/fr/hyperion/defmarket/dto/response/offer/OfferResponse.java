package fr.hyperion.defmarket.dto.response.offer;

import java.time.Instant;

import fr.hyperion.defmarket.dto.response.DocumentResponse;
import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;

public class OfferResponse {
    public Long id;
    public OfferTypeEnum offerType;
    public String value;
    public String title;
    public String description;
    public Instant startOfOffer;
    public Instant endOfOffer;
    public DocumentResponse photo;
    public DocumentResponse attachedFile;
    public ThemeTypeEnum themeType;
    public OfferCategoryEnum offerCategory;
    public String minOfferValue;
    public String midOfferValue;
    public String maxOfferValue;
    public boolean validatedByAdmin;
}
