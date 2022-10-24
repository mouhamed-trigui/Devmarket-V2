package fr.hyperion.defmarket.controller.announcement;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.FileInputStream;
import java.util.HashMap;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.AbstractControllerTest;
import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementCreationRequest;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementUpdateRequest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AnnouncementControllerTest extends AbstractControllerTest {
    final String announcementPath = AbstractController.APP_PREFIX + "/pro/announcement";

    String accessToken;
    Announcement announcement = new Announcement();

    @BeforeEach
    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
    }

    @Test
    void givenAnnouncementJsonAsMultipartFile_whenPostWithRequestPart_thenReturnsOK() throws Exception {
        final AnnouncementCreationRequest announcementCreationRequest = new AnnouncementCreationRequest();
        announcementCreationRequest.title = "Test";
        announcementCreationRequest.description = "Sfax's announcement";
        announcementCreationRequest.visible = true;
        final String jsonInString = mapper.writeValueAsString(announcementCreationRequest);
        final MockMultipartFile jsonFormData = new MockMultipartFile("announcement", null, "application/json",
            jsonInString.getBytes());
        final MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.multipart(announcementPath)
            .file(jsonFormData).header("Authorization", "Bearer " + accessToken);
        mvc.perform(builder).andExpect(status().isOk()).andDo(print());
    }

    @Test
    void testUpdate_whenPutWithValidData_thenOk() throws Exception {
        final AnnouncementUpdateRequest updateRequest = new AnnouncementUpdateRequest();
        announcement.setId(1L);
        updateRequest.title = "test Update";
        updateRequest.description = "update Test";
        updateRequest.visible = false;
        final String jsonInString = mapper.writeValueAsString(updateRequest);
        mvc.perform(put(announcementPath + "/1").header("Authorization", "Bearer " + accessToken)
                .content(jsonInString).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            .andExpect(jsonPath("$.description", is("update Test")));
    }

    @Test
    void testGetById_thenOk() throws Exception {
        mvc.perform(get(announcementPath + "/1").header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testGetById_wrongId_thenClientError() throws Exception {
        mvc.perform(get(announcementPath + "5").header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    void testUpdateLogo_addFile_thenReturnOk() throws Exception {
        final FileInputStream fis = new FileInputStream(FILE_PATH);
        final MockMultipartFile multipartFile = new MockMultipartFile("logo", fis);
        final HashMap<String, String> contentTypeParams = new HashMap<>();
        contentTypeParams.put("boundary", "265001916915724");
        final MediaType mediaType = new MediaType("multipart", "form-data", contentTypeParams);
        mvc.perform(patch(announcementPath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
            .content(multipartFile.getBytes()).contentType(mediaType)).andExpect(status().isOk());
    }

    @Test
    void testGetAll_thenOk() throws Exception {
        mvc.perform(get(announcementPath).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }


    @Test
    void testDelete_thenOk() throws Exception {
        mvc.perform(delete(announcementPath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testDelete_wrongId_thenInternalServerError() throws Exception {
        mvc.perform(delete(announcementPath + "/5").header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is5xxServerError());
    }
}
