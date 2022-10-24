package fr.hyperion.defmarket.ports.company.usecase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.company.Company;

public interface GetCompanyByUserIdUseCase {
    List<Company> getCompanyByUserId(Long userId);
}
