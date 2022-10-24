package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;

import fr.hyperion.defmarket.data.company.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class CreateCompanyByAdminEvent implements CustomEvent {
    private Company company;
    private Long ownerId;
    private Object source;
    private Instant timestamp;
}
