package fr.hyperion.defmarket.controller.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import fr.hyperion.defmarket.dto.request.user.UserEmailRequest;
import fr.hyperion.defmarket.dto.request.user.UsernameAndPasswordAuthenticationRequest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthControllerTest extends AbstractControllerTest {


    private final String authPath = AbstractController.APP_PREFIX + "/auth";
    private String accessToken;
    private String refreshToken;

    @BeforeEach
    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
        refreshToken = obtainRefreshToken("triki@gmail.com", "Triki99..");
    }

    @Test
    public void testExistsByEmail_thenOk() throws Exception {
        final UserEmailRequest emailRequest = new UserEmailRequest();
        emailRequest.email = "triki@gmail.com";
        final String jsonInString = mapper.writeValueAsString(emailRequest);
        mvc.perform(post(authPath + "/exists-by-email")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

    }

    @Test
    public void testForgetPassword_thenOK() throws Exception {
        final UserEmailRequest emailRequest = new UserEmailRequest();
        emailRequest.email = "triki@gmail.com";
        final String jsonInString = mapper.writeValueAsString(emailRequest);
        mvc.perform(post(authPath + "/forgot-password")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

    }

    @Test
    public void testForgetPassword_wrongEmail_thenClientError() throws Exception {
        final UserEmailRequest emailRequest = new UserEmailRequest();
        emailRequest.email = "wronEmail@byrsa.tech";
        final String jsonInString = mapper.writeValueAsString(emailRequest);
        mvc.perform(post(authPath + "/forgot-password")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());

    }

    @Test
    public void testLogin_thenOK() throws Exception {
        final UsernameAndPasswordAuthenticationRequest requestBody = new UsernameAndPasswordAuthenticationRequest();
        requestBody.setEmail("triki@gmail.com");
        requestBody.setPassword("Triki99..");
        requestBody.setUserType(UserTypeEnum.TRADER);
        final String jsonInString = mapper.writeValueAsString(requestBody);
        mvc.perform(post(authPath + "/login")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

    }

    @Test
    public void testLogin_worngEmail_returnUnauthorized() throws Exception {
        final UsernameAndPasswordAuthenticationRequest requestBody = new UsernameAndPasswordAuthenticationRequest();
        requestBody.setEmail("ahmedlouati@byrsa.tech");
        requestBody.setPassword("TEST123..");
        final String jsonInString = mapper.writeValueAsString(requestBody);
        mvc.perform(post(authPath + "/login")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isUnauthorized());

    }

    @Test
    public void testLogin_withInvalidEmail_returnInvalidEmail() throws Exception {
        final UsernameAndPasswordAuthenticationRequest requestBody = new UsernameAndPasswordAuthenticationRequest();
        requestBody.setEmail("houssem.triki@byrsa.tech");
        requestBody.setPassword("Triki99..");
        final String jsonInString = mapper.writeValueAsString(requestBody);
        mvc.perform(post(authPath + "/login")
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());

    }

    @Test
    void testMe_thenReturnOK() throws Exception {
        mvc.perform(get(authPath + "/me").header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    public void TestRefreshToken_thenOk() throws Exception {
        mvc.perform(post(authPath + "/refresh-token").header("Authorization", "Bearer " + refreshToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
}
