package fr.hyperion.defmarket.database.repository;

import java.util.List;

import fr.hyperion.defmarket.database.entity.DefaultRoleDB;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface DefaultRoleRepository extends BaseJpaRepository<DefaultRoleDB, Long> {
    List<DefaultRoleDB> findByTarget(UserTypeEnum target);

}
