package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ValidateTraderEvent implements CustomEvent {
    private Long userId;
    private Object source;
    private Instant timestamp;
}
