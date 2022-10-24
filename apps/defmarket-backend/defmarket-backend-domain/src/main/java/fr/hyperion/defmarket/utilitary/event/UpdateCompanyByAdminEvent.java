package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.company.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateCompanyByAdminEvent implements CustomEvent {
    private Company company;
    private Object source;
    private Instant timestamp;
}
