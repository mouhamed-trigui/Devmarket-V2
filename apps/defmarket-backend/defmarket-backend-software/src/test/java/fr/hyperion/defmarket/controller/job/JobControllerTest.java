package fr.hyperion.defmarket.controller.job;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.AbstractControllerTest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class JobControllerTest extends AbstractControllerTest {
    final String operatorPath = AbstractController.APP_PREFIX + "/pro/job";

    String accessToken;

    @BeforeEach
    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
    }

    @Test
    public void testGetAllMyJobsRef_thenOk() throws Exception {

        mvc.perform(get(operatorPath)
            .header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
}
