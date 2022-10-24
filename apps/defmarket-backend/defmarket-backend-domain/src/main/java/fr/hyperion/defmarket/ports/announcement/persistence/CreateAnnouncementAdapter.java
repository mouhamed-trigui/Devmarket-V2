package fr.hyperion.defmarket.ports.announcement.persistence;


import fr.hyperion.defmarket.data.announcement.Announcement;

public interface CreateAnnouncementAdapter {
    Announcement create(Announcement announcement);
}
