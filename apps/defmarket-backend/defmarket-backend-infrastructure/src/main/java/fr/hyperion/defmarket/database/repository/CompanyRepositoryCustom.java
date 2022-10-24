package fr.hyperion.defmarket.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.database.entity.CompanyDB;

public interface CompanyRepositoryCustom {
    Page<CompanyDB> findByCompanyNameAndSiren(Pageable pageable, String input);
}

