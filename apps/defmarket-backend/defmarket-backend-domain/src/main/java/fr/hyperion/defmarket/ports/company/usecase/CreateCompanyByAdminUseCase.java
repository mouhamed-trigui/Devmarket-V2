package fr.hyperion.defmarket.ports.company.usecase;

import fr.hyperion.defmarket.data.company.Company;

public interface CreateCompanyByAdminUseCase {
    Company createByAdmin(Company company, Long ownerId);
}
