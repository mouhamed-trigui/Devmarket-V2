package fr.hyperion.defmarket.ports.company.usecase.getters;

import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetCompaniesCountUseCase {
    Long getCompaniesCount(CompanyFilter companyFilter);
}
