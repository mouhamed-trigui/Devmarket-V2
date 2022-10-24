package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteTraderByAdminEvent implements CustomEvent {
    private Long userId;
    private String firstName;
    private String email;
    private Object source;
    private Instant timestamp;
}
