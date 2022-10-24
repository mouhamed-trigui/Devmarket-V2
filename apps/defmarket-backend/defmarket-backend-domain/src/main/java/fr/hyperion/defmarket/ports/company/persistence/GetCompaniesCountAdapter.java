package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetCompaniesCountAdapter {
    Long getCompaniesCount(CompanyFilter companyFilter);
}
