package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ValidateStoreByAdminEvent implements CustomEvent {
    private Long storeId;
    private Object source;
    private Instant timestamp;
}
