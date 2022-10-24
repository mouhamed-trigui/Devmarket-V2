package fr.hyperion.defmarket.adapters.announcement;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.announcement.mapper.AnnouncementDBMapper;
import fr.hyperion.defmarket.adapters.file.DocumentAdapter;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.database.entity.AnnouncementDB;
import fr.hyperion.defmarket.database.repository.AnnouncementRepository;
import fr.hyperion.defmarket.ports.announcement.persistence.CreateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.DeleteAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetAllAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetOneAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateImageAnnouncementAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementAdapter implements CreateAnnouncementAdapter, UpdateAnnouncementAdapter, UpdateImageAnnouncementAdapter, GetAllAnnouncementAdapter, GetOneAnnouncementAdapter, DeleteAnnouncementAdapter {
    private static final String UPLOAD_ANNOUNCEMENTS_PATH = "announcement/%s";
    private final AnnouncementRepository announcementRepository;
    private final AnnouncementDBMapper announcementDBMapper;
    private final DocumentDBMapper documentDBMapper;
    private final DocumentAdapter documentAdapter;

    @Transactional
    @Override
    public Announcement create(final Announcement announcement) {
        final Document image = documentAdapter.saveAsPublic(announcement.getImage(), UPLOAD_ANNOUNCEMENTS_PATH.formatted(announcement.getTitle()));
        announcement.setImage(image);
        AnnouncementDB announcementDB = announcementDBMapper.toEntity(announcement);
        announcementDB = announcementRepository.save(announcementDB);
        return announcementDBMapper.toData(announcementDB);
    }

    @Override
    @Transactional
    public void delete(final Long id) {
        final Announcement announcement = getOne(id);
        announcement.setDeleted(true);
        update(announcement, id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Announcement> getAll() {
        final List<AnnouncementDB> allAnnouncements = announcementRepository.findAllByDeletedIsFalse();
        return announcementDBMapper.toData(allAnnouncements);
    }

    @Override
    @Transactional(readOnly = true)
    public Announcement getOne(final Long id) {
        final AnnouncementDB announcementDB = announcementRepository.findByIdAndDeletedIsFalse(id);
        return announcementDBMapper.toData(announcementDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Announcement update(final Announcement announcement, final Long id) {
        AnnouncementDB announcementDB = announcementRepository.getReferenceById(id);
        announcementDB = announcementDBMapper.toUpdate(announcement, announcementDB);
        return announcementDBMapper.toData(announcementDB);
    }

    @Override
    @Transactional(readOnly = true)
    public Announcement updateImage(final Document image, final Long id) {
        final AnnouncementDB announcementDB = announcementRepository.getReferenceById(id);
        final Document newImage = documentAdapter.saveAsPublic(image, UPLOAD_ANNOUNCEMENTS_PATH.formatted(announcementDB.getTitle()));
        announcementDB.setImage(documentDBMapper.toEntity(newImage));
        return announcementDBMapper.toData(announcementDB);
    }
}
