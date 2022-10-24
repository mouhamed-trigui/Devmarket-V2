package fr.hyperion.defmarket.utilitary.event.port.out;

import fr.hyperion.defmarket.utilitary.event.CustomEvent;

public interface EventPublisher {
    void publishEvent(CustomEvent event);
}
