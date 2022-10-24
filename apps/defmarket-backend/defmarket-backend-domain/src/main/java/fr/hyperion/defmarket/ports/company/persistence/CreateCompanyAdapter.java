package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.Company;

public interface CreateCompanyAdapter {
    Company create(Company company, Long ownerId);
}
