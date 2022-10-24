package fr.hyperion.defmarket.ports.announcement.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface GetAllAnnouncementAdapter {
    List<Announcement> getAll();
}
