package fr.hyperion.defmarket.ports.company.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.company.CompanyFilter;

public interface GetAllCompanyByFilterAdapter {
    Page<Company> getAllByFilter(CompanyFilter companyFilter, Pageable pageable);
}
