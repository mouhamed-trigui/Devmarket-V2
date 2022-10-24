package fr.hyperion.defmarket.database.repository;

import java.util.List;

import fr.hyperion.defmarket.database.entity.AnnouncementDB;

public interface AnnouncementRepository extends CustomBaseJpaRepository<AnnouncementDB, Long> {
    List<AnnouncementDB> findAllByDeletedIsFalse();

    AnnouncementDB findByIdAndDeletedIsFalse(Long id);
}
