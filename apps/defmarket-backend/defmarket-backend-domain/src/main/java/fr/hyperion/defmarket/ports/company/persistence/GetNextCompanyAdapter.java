package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetNextCompanyAdapter {
    Company getNextCompany(final Long currentCompanyId, final CompanyFilter companyFilter, final boolean desc);

}
