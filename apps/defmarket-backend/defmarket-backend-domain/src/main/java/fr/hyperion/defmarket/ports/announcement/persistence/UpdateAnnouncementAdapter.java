package fr.hyperion.defmarket.ports.announcement.persistence;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface UpdateAnnouncementAdapter {
    Announcement update(Announcement announcement, Long id);
}
