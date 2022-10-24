package fr.hyperion.defmarket.data.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
public class AdminOfferFilter extends OfferFilter {
    private Boolean validated;
    private Boolean blocked;
    private Boolean hasModeration;
}
