package fr.hyperion.defmarket.database.entity;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import fr.hyperion.defmarket.enumerated.company.ClosureTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class TemporaryClosureDB {
    @Enumerated(EnumType.STRING)
    private ClosureTypeEnum closureType;

    private String reason;
}
