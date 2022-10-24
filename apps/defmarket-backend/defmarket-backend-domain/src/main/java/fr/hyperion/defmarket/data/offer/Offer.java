package fr.hyperion.defmarket.data.offer;

import java.time.Instant;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Offer {
    private Long id;

    private OfferTypeEnum offerType;

    private ThemeTypeEnum themeType;

    private OfferCategoryEnum offerCategory;

    private String value;

    private String title;

    private String description;

    private Instant startOfOffer;

    private Instant endOfOffer;

    private boolean validatedByAdmin;

    private Document photo;

    private Document attachedFile;

    private Store store;

    private boolean deleted;

    private String minOfferValue;
    private String midOfferValue;
    private String maxOfferValue;

    private boolean blocked = false;

}
