package fr.hyperion.defmarket.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import fr.hyperion.defmarket.database.entity.RedirectMappingDB;

public interface RedirectMappingDBRepository extends JpaRepository<RedirectMappingDB, String>,
    JpaSpecificationExecutor<RedirectMappingDB> {
}
