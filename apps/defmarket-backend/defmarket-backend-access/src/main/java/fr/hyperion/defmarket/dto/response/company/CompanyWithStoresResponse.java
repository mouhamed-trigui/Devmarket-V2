package fr.hyperion.defmarket.dto.response.company;

import java.util.List;

import fr.hyperion.defmarket.dto.response.store.StoreCompanyResponse;

public class CompanyWithStoresResponse {
    public Long companyId;

    public String companyName;

    public List<StoreCompanyResponse> storeList;

    public int nbOfStores;

}
