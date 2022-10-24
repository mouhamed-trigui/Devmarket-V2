package fr.hyperion.defmarket.data.company;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.enumerated.company.CompanyTypeEnum;
import fr.hyperion.defmarket.enumerated.company.LeaderTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Company {

    private Long id;

    private CompanyTypeEnum companyType;

    private String name;

    private String siren;

    private String tva;

    private LeaderTypeEnum leaderType;

    private Address address;

    private Ruler ruler;

    private boolean deleted;

    private boolean validatedByAdmin;

    private boolean blocked = false;

    private String otherActivity;
}
