package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SendRequestInfoMailEvent implements CustomEvent {
    private Long userId;
    private String subject;
    private String message;
    private Object source;
    private Instant timestamp;
}
