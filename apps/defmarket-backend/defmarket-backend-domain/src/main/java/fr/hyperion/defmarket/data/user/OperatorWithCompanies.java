package fr.hyperion.defmarket.data.user;

import java.util.List;

import fr.hyperion.defmarket.data.company.Company;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class OperatorWithCompanies extends Operator {

    private List<Company> companies;

}
