package fr.hyperion.defmarket.database.repository;

import fr.hyperion.defmarket.database.entity.CompanyDB;

public interface CompanyRepository extends CustomBaseJpaRepository<CompanyDB, Long>, CompanyRepositoryCustom {

}


