package fr.hyperion.defmarket.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.hyperion.defmarket.dto.request.user.UsernameAndPasswordAuthenticationRequest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public class AbstractControllerTest {

    protected static final String FILE_PATH = "src/test/resources/shop-store.jpg";

    @Autowired
    protected MockMvc mvc;

    @Autowired
    protected ObjectMapper mapper;

    final String authenticationPath = AbstractController.APP_PREFIX + "/auth/login";

    protected String obtainAccessToken(final String username, final String password, final UserTypeEnum userType) throws Exception {
        final UsernameAndPasswordAuthenticationRequest requestBody = new UsernameAndPasswordAuthenticationRequest();
        requestBody.setEmail(username);
        requestBody.setPassword(password);
        requestBody.setUserType(userType);
        final String jsonInString = mapper.writeValueAsString(requestBody);
        final ResultActions result = mvc.perform(post(authenticationPath).content(jsonInString))
            .andExpect(status().isOk());

        final String resultString = result.andReturn().getResponse().getContentAsString();
        final JacksonJsonParser jsonParser = new JacksonJsonParser();
        return jsonParser.parseMap(resultString).get("accessToken").toString();
    }

    protected String obtainRefreshToken(final String username, final String password) throws Exception {

        final UsernameAndPasswordAuthenticationRequest requestBody = new UsernameAndPasswordAuthenticationRequest();
        requestBody.setEmail(username);
		requestBody.setPassword(password);
		final String jsonInString = mapper.writeValueAsString(requestBody);
		final ResultActions result = mvc.perform(post(authenticationPath).content(jsonInString))
				.andExpect(status().isOk());

		final String resultString = result.andReturn().getResponse().getContentAsString();
		final JacksonJsonParser jsonParser = new JacksonJsonParser();
		return jsonParser.parseMap(resultString).get("refreshToken").toString();

	}

}
