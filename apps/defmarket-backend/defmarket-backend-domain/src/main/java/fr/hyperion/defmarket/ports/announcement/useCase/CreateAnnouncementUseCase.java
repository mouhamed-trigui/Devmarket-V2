package fr.hyperion.defmarket.ports.announcement.useCase;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface CreateAnnouncementUseCase {
    Announcement create(Announcement announcement);
}
