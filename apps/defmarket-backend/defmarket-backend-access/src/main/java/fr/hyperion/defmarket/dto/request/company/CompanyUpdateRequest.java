package fr.hyperion.defmarket.dto.request.company;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;
import fr.hyperion.defmarket.dto.request.ruler.RulerRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.enumerated.company.CompanyTypeEnum;
import fr.hyperion.defmarket.enumerated.company.LeaderTypeEnum;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CompanyUpdateRequest {
    @NotNull
    public CompanyTypeEnum companyType;

    @NotNull
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String name;

    public String siren;

    public String tva;

    @NotNull
    public LeaderTypeEnum leaderType;

    public AddressDetailedRequest address;
    
    public RulerRequest ruler;
}
