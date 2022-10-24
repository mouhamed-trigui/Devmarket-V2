package fr.hyperion.defmarket.dto.response.company;

import java.util.List;

import fr.hyperion.defmarket.data.user.OperatorMinified;

public class AdminCompanyResponse extends CompanyResponse {
    public boolean blocked;
    public int nbOfStores;
    public List<OperatorMinified> owners;
}
