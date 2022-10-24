package fr.hyperion.defmarket.ports.company.usecase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.Company;

public interface GetCompanyByNameOrSirenUseCase {
    Page<Company> getCompanyByNameOrSiren(Pageable pageable, String input);
}
