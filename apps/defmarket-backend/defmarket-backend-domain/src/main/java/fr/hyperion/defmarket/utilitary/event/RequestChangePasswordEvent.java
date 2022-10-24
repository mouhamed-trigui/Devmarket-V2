package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RequestChangePasswordEvent implements CustomEvent {
    private String email;
    private Object source;
    private Instant timestamp;
}
