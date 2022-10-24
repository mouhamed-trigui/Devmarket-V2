package fr.hyperion.defmarket.database.repository;

import java.util.List;

import fr.hyperion.defmarket.database.entity.TimetableDB;

public interface TimetableRepository extends BaseJpaRepository<TimetableDB, Long> {
    List<TimetableDB> findAllByStoreId(Long storeId);
}
