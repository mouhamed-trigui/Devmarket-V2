package fr.hyperion.defmarket.ports.company.usecase.getters;

import fr.hyperion.defmarket.data.company.Company;

public interface RetrieveCompanyUseCase {
    Company getById(Long id);
}
