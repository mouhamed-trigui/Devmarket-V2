package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ValidateCompanyByAdminEvent implements CustomEvent {
    private Long companyId;
    private Object source;
    private Instant timestamp;
}
