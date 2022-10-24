package fr.hyperion.defmarket.ports.company.usecase;

import fr.hyperion.defmarket.data.company.Company;

public interface AddCompanyUseCase {
    Company create(Company company, Long ownerId);
}
