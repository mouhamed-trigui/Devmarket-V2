package fr.hyperion.defmarket.ports.announcement.persistence;

import fr.hyperion.defmarket.data.announcement.Announcement;

public interface GetOneAnnouncementAdapter {
    Announcement getOne(Long id);
}
