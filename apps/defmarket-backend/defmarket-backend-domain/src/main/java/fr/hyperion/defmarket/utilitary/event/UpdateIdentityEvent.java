package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.user.Operator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateIdentityEvent implements CustomEvent {
    private Operator user;
    private Object source;
    private Instant timestamp;
}
