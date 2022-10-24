package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteCompanyByAdminEvent implements CustomEvent {
    private Long companyId;
    private Object source;
    private Instant timestamp;
}
