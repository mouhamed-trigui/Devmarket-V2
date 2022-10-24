package fr.hyperion.defmarket.ports.company.usecase.getters;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetNextCompanyUseCase {
    Company getNextCompany(final Long currentCompanyId, final CompanyFilter companyFilter, final boolean desc);

}
