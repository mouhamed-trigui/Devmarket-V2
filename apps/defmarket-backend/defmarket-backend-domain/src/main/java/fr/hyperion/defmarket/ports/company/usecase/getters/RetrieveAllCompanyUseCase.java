package fr.hyperion.defmarket.ports.company.usecase.getters;

import fr.hyperion.defmarket.data.company.Company;

import java.util.List;

public interface RetrieveAllCompanyUseCase {
    List<Company> getByOwnerId(Long ownerId);
}
