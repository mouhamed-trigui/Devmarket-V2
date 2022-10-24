package fr.hyperion.defmarket.database.repository;

import fr.hyperion.defmarket.database.entity.StoreDB;

public interface StoreRepository extends CustomBaseJpaRepository<StoreDB, Long>, StoreRepositoryCustom {
    StoreDB findByOfferList_Id(Long id);
}
