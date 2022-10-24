package fr.hyperion.defmarket.database.repository;

import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.database.entity.StoreDB;

public interface StoreRepositoryCustom {
    Page<StoreDB> findStoreByNameOrCity(Pageable pageable, String input);

    Page<StoreDB> getTheDistanceFromOneStoreToAnother(Pageable pageable, Point point, Double distance, CustomerStoreFilter customerStoreFilter);
}
