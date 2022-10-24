package fr.hyperion.defmarket.service.announcement;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.ports.announcement.persistence.CreateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.DeleteAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetAllAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetOneAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateImageAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.useCase.CreateAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.DeleteAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.UpadateAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.UpdateImageAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.getters.GetAllAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.getters.GetOneAnnouncementUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements CreateAnnouncementUseCase, UpdateImageAnnouncementUseCase, UpadateAnnouncementUseCase, DeleteAnnouncementUseCase, GetAllAnnouncementUseCase, GetOneAnnouncementUseCase {
    private final CreateAnnouncementAdapter createAnnouncementAdapter;
    private final UpdateAnnouncementAdapter updateAnnouncementAdapter;
    private final UpdateImageAnnouncementAdapter updateImageAnnouncementAdapter;
    private final DeleteAnnouncementAdapter deleteAnnouncementAdapter;
    private final GetOneAnnouncementAdapter getOneAnnouncementAdapter;
    private final GetAllAnnouncementAdapter getAllAnnouncementAdapter;

    @Override
    public Announcement create(final Announcement announcement) {
        final Announcement savedAnnouncement = createAnnouncementAdapter.create(announcement);
        log.info("Announcement has been created{}", announcement);
        return savedAnnouncement;
    }

    @Override
    public void delete(final Long id) {
        deleteAnnouncementAdapter.delete(id);
        log.info("Announcement with id  {} has been deleted", id);
    }

    @Override
    public Announcement update(final Announcement announcement, final Long id) {
        final Announcement update = updateAnnouncementAdapter.update(announcement, id);
        log.info("Announcement with id {} has been updated", id);
        return update;
    }

    @Override
    public Announcement updateImage(final Document image, final Long id) throws IOException {
        final Announcement announcement = updateImageAnnouncementAdapter.updateImage(image, id);
        log.info("Image of Announcement with Id {} has been updated", id);
        return announcement;
    }

    @Override
    public List<Announcement> getAll() {
        return getAllAnnouncementAdapter.getAll();
    }

    @Override
    public Announcement getOne(final Long id) {
        return getOneAnnouncementAdapter.getOne(id);
    }

}
