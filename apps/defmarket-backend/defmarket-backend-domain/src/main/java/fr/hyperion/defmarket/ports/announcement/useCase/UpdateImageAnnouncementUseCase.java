package fr.hyperion.defmarket.ports.announcement.useCase;

import java.io.IOException;

import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;

public interface UpdateImageAnnouncementUseCase {
    Announcement updateImage(Document image, Long id) throws IOException;
}
