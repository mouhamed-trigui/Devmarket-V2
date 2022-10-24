package fr.hyperion.defmarket.gateway.event.mail;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.gateway.event.mail.mapper.EmailEventDataMapper;
import fr.hyperion.defmarket.gateway.mail.internal.model.EmailEvent;
import fr.hyperion.defmarket.ports.user.mail.EmailData;
import fr.hyperion.defmarket.ports.user.mail.PublishEmail;
import fr.hyperion.defmarket.ports.user.mail.ScheduleEmailSending;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class EmailEventPublisher implements PublishEmail, ScheduleEmailSending {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final EmailEventDataMapper emailEventDataMapper;

    @Override
    @Async
    public void publishEmail(final EmailData emailData) {
        log.info("Publishing email event. ");
        final EmailEventData emailEventData = emailEventDataMapper.toEmailEventData(emailData);
        final EmailEvent customEmailEvent = new EmailEvent(emailEventData);
        applicationEventPublisher.publishEvent(customEmailEvent);
    }

    @Override
    @Async
    public void scheduleEmailSending(final EmailData emailData, final Instant instantOfSending) {
        final EmailEventData emailEventData = emailEventDataMapper.toEmailEventData(emailData);
        final EmailEvent customEmailEvent = new EmailEvent(emailEventData, Clock.fixed(instantOfSending, ZoneId.systemDefault()));
        applicationEventPublisher.publishEvent(customEmailEvent);
    }
}
