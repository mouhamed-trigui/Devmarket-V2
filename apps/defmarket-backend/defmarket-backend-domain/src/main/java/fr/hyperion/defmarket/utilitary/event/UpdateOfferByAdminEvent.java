package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.offer.Offer;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateOfferByAdminEvent implements CustomEvent {
    private Offer offer;
    private Object source;
    private Instant timestamp;
}
