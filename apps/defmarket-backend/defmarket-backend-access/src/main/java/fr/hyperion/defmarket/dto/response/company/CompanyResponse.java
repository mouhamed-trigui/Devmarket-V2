package fr.hyperion.defmarket.dto.response.company;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.dto.response.ruler.RulerResponse;
import fr.hyperion.defmarket.enumerated.company.CompanyTypeEnum;
import fr.hyperion.defmarket.enumerated.company.LeaderTypeEnum;

public class CompanyResponse {
    public Long id;

    public CompanyTypeEnum companyType;

    public String name;

    public String siren;

    public String tva;

    public LeaderTypeEnum leaderType;

    public Address address;

    public boolean validatedByAdmin;

    public String otherActivity;

    public boolean blocked;

    public RulerResponse ruler;
}
