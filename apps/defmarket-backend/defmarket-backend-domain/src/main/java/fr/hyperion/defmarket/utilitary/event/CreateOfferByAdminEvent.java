package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.offer.Offer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class CreateOfferByAdminEvent implements CustomEvent {
    private Offer offer;
    private Long storeId;
    private Object source;
    private Instant timestamp;
}
