package fr.hyperion.defmarket.ports.announcement.useCase.getters;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface GetOneAnnouncementUseCase {
    Announcement getOne(Long id);
}
