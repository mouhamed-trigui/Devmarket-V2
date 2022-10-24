package fr.hyperion.defmarket.ports.announcement.persistence;

import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;

public interface UpdateImageAnnouncementAdapter {

    Announcement updateImage(Document image, Long id);
}
