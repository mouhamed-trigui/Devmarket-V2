package fr.hyperion.defmarket.data.offer;

import java.util.List;

import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StatusEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferFilter {
    private List<OfferTypeEnum> offerType;

    private List<ThemeTypeEnum> themeType;

    private StatusEnum status;

    private OfferCategoryEnum offerCategory;

}
