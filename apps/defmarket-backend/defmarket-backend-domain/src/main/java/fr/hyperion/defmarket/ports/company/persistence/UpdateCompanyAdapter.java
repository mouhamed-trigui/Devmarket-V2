package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.Company;

public interface UpdateCompanyAdapter {
    Company update(Company company);
}
