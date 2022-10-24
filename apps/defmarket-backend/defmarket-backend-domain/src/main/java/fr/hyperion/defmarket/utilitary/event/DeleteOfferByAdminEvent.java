package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteOfferByAdminEvent implements CustomEvent {
    private Long offerId;
    private Object source;
    private Instant timestamp;
}
