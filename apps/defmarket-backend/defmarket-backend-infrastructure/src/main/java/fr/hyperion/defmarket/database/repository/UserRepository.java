package fr.hyperion.defmarket.database.repository;

import fr.hyperion.defmarket.database.entity.UserAccountDB;

public interface UserRepository extends CustomBaseJpaRepository<UserAccountDB, Long>, StoreKeeperRepositoryCustom {

    boolean existsByEmail(String email);
}
