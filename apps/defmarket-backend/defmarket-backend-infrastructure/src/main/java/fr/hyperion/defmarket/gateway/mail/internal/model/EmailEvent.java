package fr.hyperion.defmarket.gateway.mail.internal.model;

import java.time.Clock;

import org.springframework.context.ApplicationEvent;

import fr.hyperion.defmarket.gateway.event.mail.EmailEventData;
import lombok.Getter;

@Getter
public class EmailEvent extends ApplicationEvent {

    private static final long serialVersionUID = 6452896767642672877L;

    private final EmailEventData data;

    public EmailEvent(final EmailEventData data) {
        super(data);
        this.data = data;
    }

    public EmailEvent(final EmailEventData data, final Clock clock) {
        super(data, clock);
        this.data = data;
    }

}
