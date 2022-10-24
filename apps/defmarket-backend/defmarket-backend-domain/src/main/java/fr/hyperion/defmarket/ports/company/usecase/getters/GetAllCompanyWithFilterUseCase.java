package fr.hyperion.defmarket.ports.company.usecase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetAllCompanyWithFilterUseCase {
    Page<Company> getAllCompanyWithFilter(CompanyFilter companyFilter, Pageable pageable);
}
