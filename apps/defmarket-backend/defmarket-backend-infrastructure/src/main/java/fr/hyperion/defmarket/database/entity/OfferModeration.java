package fr.hyperion.defmarket.database.entity;

import java.io.Serializable;
import java.time.Instant;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import lombok.Data;

@Data
public class OfferModeration implements Serializable {
    private OfferTypeEnum offerType;

    private ThemeTypeEnum themeType;

    private OfferCategoryEnum offerCategory;

    private String value;

    private String title;

    private String description;

    private Instant startOfOffer;

    private Instant endOfOffer;

    private Document photo;

    private Document attachedFile;

    private Long storeId;

    private String minOfferValue;
    private String midOfferValue;
    private String maxOfferValue;
}
