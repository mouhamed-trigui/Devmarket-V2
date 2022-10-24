package fr.hyperion.defmarket.gateway.event;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.utilitary.event.CustomEvent;
import fr.hyperion.defmarket.utilitary.event.port.out.EventPublisher;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class PublisherImpl implements EventPublisher {

    private final ApplicationEventPublisher applicationEventPublisher;

    @Override
    public void publishEvent(final CustomEvent customEvent) {
        log.info("Publishing Event {}", customEvent);
        applicationEventPublisher.publishEvent(customEvent);
    }
}
