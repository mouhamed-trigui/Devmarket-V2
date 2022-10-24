package fr.hyperion.defmarket.ports.announcement.useCase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface GetAllAnnouncementUseCase {
    List<Announcement> getAll();
}
