package fr.hyperion.defmarket.ports.announcement.useCase;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface UpadateAnnouncementUseCase {
    Announcement update(Announcement announcement, Long id);
}
