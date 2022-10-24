package fr.hyperion.defmarket.ports.user.mail;

import java.time.Instant;

public interface ScheduleEmailSending {

    void scheduleEmailSending(EmailData emailData, Instant instantOfSending);

}
