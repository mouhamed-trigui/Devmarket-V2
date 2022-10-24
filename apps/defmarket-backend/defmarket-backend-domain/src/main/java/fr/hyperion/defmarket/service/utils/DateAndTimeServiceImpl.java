package fr.hyperion.defmarket.service.utils;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;

@Service
public class DateAndTimeServiceImpl implements DateAndTimeUseCase {
    private static final String EUROPE_PARIS = "Europe/Paris";

    @Override
    public Instant nowUTC() {
        return Instant.now(Clock.systemUTC());
    }

    @Override
    public ZoneId originalZone() {
        return ZoneId.of(EUROPE_PARIS);
    }
}
