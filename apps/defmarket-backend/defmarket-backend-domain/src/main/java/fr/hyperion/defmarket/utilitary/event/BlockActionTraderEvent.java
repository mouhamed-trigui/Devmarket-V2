package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BlockActionTraderEvent implements CustomEvent {

    private Long userId;
    private String reason;
    private boolean blockAction;
    private Object source;
    private Instant timestamp;
}
