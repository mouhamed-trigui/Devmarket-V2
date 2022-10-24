package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.store.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class CreateStoreByAdminEvent implements CustomEvent {
    private Store store;
    private Long companyId;
    private Object source;
    private Instant timestamp;
}
