package fr.hyperion.defmarket.ports.company.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.Company;

public interface GetCompanyByNameOrSirenAdapter {
    Page<Company> GetCompanyByNameOrSiren(Pageable pageable, String input);
}
