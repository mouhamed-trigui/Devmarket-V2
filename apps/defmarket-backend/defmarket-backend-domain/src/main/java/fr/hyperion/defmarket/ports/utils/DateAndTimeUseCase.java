package fr.hyperion.defmarket.ports.utils;

import java.time.Instant;
import java.time.ZoneId;

public interface DateAndTimeUseCase {
    Instant nowUTC();

    ZoneId originalZone();
}
