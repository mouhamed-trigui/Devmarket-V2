package fr.hyperion.defmarket.controller.store;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.FileInputStream;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.AbstractControllerTest;
import fr.hyperion.defmarket.dto.request.store.StoreCreationRequest;
import fr.hyperion.defmarket.dto.request.store.StoreUpdateRequest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class StoreControllerTest extends AbstractControllerTest {

    private final String storePath = AbstractController.APP_PREFIX + "/pro/store";

    private String accessToken;

    @BeforeEach

    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
    }


    @Test
    void givenCompanyJsonAsMultipartFile_whenPostWithRequestPart_thenReturnsOK() throws Exception {
        final StoreCreationRequest creationRequest = new StoreCreationRequest();
        creationRequest.name = "Byrsa Sfax";
        creationRequest.description = "Sfax's store";
        creationRequest.companyId = 1L;
        final String jsonInString = mapper.writeValueAsString(creationRequest);
        final MockMultipartFile jsonFormData = new MockMultipartFile("store", null, "application/json",
            jsonInString.getBytes());
        final MockHttpServletRequestBuilder builder = multipart(storePath)
            .file(jsonFormData).header("Authorization", "Bearer " + accessToken);
        mvc.perform(builder).andExpect(status().isOk()).andDo(print());
    }

    @Test
    void testGetById_thenOk() throws Exception {
        mvc.perform(get(storePath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testGetById_wrongId_thenClientError() throws Exception {
        mvc.perform(get(storePath + "/{id}", 99L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    void testUpdate_whenPutWithValidData_thenOk() throws Exception {
        final StoreUpdateRequest updateRequest = new StoreUpdateRequest();
        updateRequest.name = "Byrsa Sfax";
        updateRequest.description = "Sfaxien store";
        final String jsonInString = mapper.writeValueAsString(updateRequest);
        mvc.perform(put(storePath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
                .content(jsonInString).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            .andExpect(jsonPath("$.description", is("Sfaxien store")));
    }

    @Test
    void testUpdate_whenPutWithMissingData_thenBadRequest() throws Exception {
        final StoreUpdateRequest updateRequest = new StoreUpdateRequest();
        updateRequest.description = "Sfaxien store";
        final String jsonInString = mapper.writeValueAsString(updateRequest);
        mvc.perform(put(storePath + "/1").header("Authorization", "Bearer " + accessToken)
            .content(jsonInString).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest());
    }

    @Test
    void testUpdateLogo_addFile_thenReturnOk() throws Exception {
        final FileInputStream fis = new FileInputStream(FILE_PATH);
        final MockMultipartFile multipartFile = new MockMultipartFile("logo", "store_shop.jpg", MediaType.IMAGE_JPEG_VALUE, fis);
        mvc.perform(multipart(HttpMethod.PATCH, UriComponentsBuilder.fromUriString(storePath + "/{id}/logo").buildAndExpand(Map.of("id", 1L))
                .encode()
                .toUri())
                .file(multipartFile)
                .header("Authorization", "Bearer " + accessToken))
            .andExpect(status().isOk());
    }

    @Test
    void testGetAll_thenOk() throws Exception {
        mvc.perform(get(storePath + "/{companyId}", 1L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testGetAll_wrongCompanyId_thenClientError() throws Exception {
        mvc.perform(get(storePath + "/{companyId}", 99L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    void testDelete_thenOk() throws Exception {
        mvc.perform(delete(storePath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testDelete_wrongId_thenClientError() throws Exception {
        mvc.perform(delete(storePath + "/{id}", 99L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

}
