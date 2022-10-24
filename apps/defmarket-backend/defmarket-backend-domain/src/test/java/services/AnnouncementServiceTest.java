package services;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.ports.announcement.persistence.CreateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.DeleteAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetAllAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.GetOneAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateAnnouncementAdapter;
import fr.hyperion.defmarket.ports.announcement.persistence.UpdateImageAnnouncementAdapter;
import fr.hyperion.defmarket.service.announcement.AnnouncementServiceImpl;

@ExtendWith(MockitoExtension.class)
public class AnnouncementServiceTest {
    @InjectMocks
    private AnnouncementServiceImpl announcementService;

    @Mock
    private CreateAnnouncementAdapter createAnnouncementAdapter;
    @Mock
    private UpdateAnnouncementAdapter updateAnnouncementAdapter;
    @Mock
    private UpdateImageAnnouncementAdapter updateImageAnnouncementAdapter;
    @Mock
    private DeleteAnnouncementAdapter deleteAnnouncementAdapter;
    @Mock
    private GetOneAnnouncementAdapter getOneAnnouncementAdapter;
    @Mock
    private GetAllAnnouncementAdapter getAllAnnouncementAdapter;
    private Announcement announcement;
    private List<Announcement> announcements;

    @BeforeEach
    public void setup() {
        System.out.println("initializing Data");
        announcements = new ArrayList<>();
        announcement = new Announcement();
        announcement.setId(1L);

    }

    @Test
    void shouldCreate() {
        when(createAnnouncementAdapter.create(any(Announcement.class))).thenReturn(announcement);
        assertEquals(announcement, announcementService.create(new Announcement()));

    }

    @Test
    void shouldDelete() {
        doNothing().when(deleteAnnouncementAdapter).delete(anyLong());
        assertDoesNotThrow(() -> announcementService.delete(2L));
    }

    @Test
    void shouldUpdate() {
        when(updateAnnouncementAdapter.update(any(Announcement.class), anyLong())).thenReturn(announcement);
        assertEquals(announcement, announcementService.update(announcement, announcement.getId()));
    }

    @Test
    void shouldUpdateImage() throws IOException {
        when(updateImageAnnouncementAdapter.updateImage(any(Document.class), anyLong())).thenReturn(announcement);
        assertEquals(announcement, announcementService.updateImage(new Document(), announcement.getId()));
    }

    @Test
    void shouldGetAll() {
        when(getAllAnnouncementAdapter.getAll()).thenReturn(announcements);
        assertEquals(announcements, announcementService.getAll());
    }


    @Test
    void shouldGetOne() {
        when(getOneAnnouncementAdapter.getOne(anyLong())).thenReturn(announcement);
        assertEquals(announcement, announcementService.getOne(announcement.getId()));
    }
}
