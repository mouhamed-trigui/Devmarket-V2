package fr.hyperion.defmarket.controller.user;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.AbstractControllerTest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationInitRequest;
import fr.hyperion.defmarket.dto.request.user.OperatorCreationRequest;
import fr.hyperion.defmarket.dto.request.user.PasswordChangeRequest;
import fr.hyperion.defmarket.dto.request.user.TraderUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressRequest;
import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TraderControllerTest extends AbstractControllerTest {

    String operatorPath = AbstractController.APP_PREFIX + "/pro/";

    String accessToken;

    @BeforeEach
    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
    }

    @Test
    public void testSignup_thenOK() throws Exception {
        final OperatorCreationInitRequest signupRequest = new OperatorCreationInitRequest();
        final AddressRequest addressRequest = new AddressRequest();
        addressRequest.city = "sfax";
        addressRequest.department = "IT";
        addressRequest.zipCode = "3069";
        addressRequest.country = "Tunisia";
        addressRequest.street = "werda";
        signupRequest.email = "houssemtriki@gmail.com";
        signupRequest.password = "Triki99..";
        final ObjectMapper objectMapper = new ObjectMapper();
        final String signupRequestString = objectMapper.writeValueAsString(signupRequest);
        final MvcResult mvcResult = mvc.perform(post("/api/pro/register").content(signupRequestString))
            .andDo(print())
            .andExpect(status().isCreated())
            .andReturn();
        assertEquals(201, mvcResult.getResponse().getStatus());
    }
    @Test
    public void testUpdate_missingName_thenValidationError() throws Exception {
        System.out.println(accessToken);

        final TraderUpdateRequest traderUpdateRequest = new TraderUpdateRequest();

        traderUpdateRequest.birthday = LocalDate.now();
        traderUpdateRequest.firstName = "Houssem";
        final String jsonInString = mapper.writeValueAsString(traderUpdateRequest);
        mvc.perform(put(operatorPath + "/profile")
            .header("Authorization", "Bearer " + accessToken)
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());

    }


    @Test
    public void testUpdatePassword_thenOk() throws Exception {
        final PasswordChangeRequest passwordChangeRequest = new PasswordChangeRequest();
        passwordChangeRequest.newPassword = "Ahmed&1992";
        passwordChangeRequest.oldPassword = "Triki99..";
        final String jsonInString = mapper.writeValueAsString(passwordChangeRequest);
        mvc.perform(patch(operatorPath + "/update-password")
            .header("Authorization", "Bearer " + accessToken)
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());
    }

/*  unComment when add control in password
  @Test
    public void testUpdatePassword_withSamePassword_thenClientError() throws Exception {
        final PasswordChangeRequest passwordChangeRequest = new PasswordChangeRequest();
        passwordChangeRequest.newPassword = "Triki99..";
        passwordChangeRequest.oldPassword = "Triki99..";
        final String jsonInString = mapper.writeValueAsString(passwordChangeRequest);
        mvc.perform(patch(operatorPath + "update-password")
            .header("Authorization", "Bearer " + accessToken)
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }*/

    @Test
    public void testSignUpPart2_thenOk() throws Exception {
        final OperatorCreationRequest signupPart2Request = new OperatorCreationRequest();
        final PhoneRequest phoneRequest = new PhoneRequest();
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Gremda", "Sfax", "3090",
            "Route klm 10");
        phoneRequest.prefix = "216";
        phoneRequest.number = "54765267";
        signupPart2Request.address = address;
        signupPart2Request.birthday = LocalDate.now();
        signupPart2Request.firstName = "Houssem";
        signupPart2Request.lastName = "Triki";
        signupPart2Request.gender = GenderEnum.MALE;
        signupPart2Request.knowUsThrough = KnowUsThroughEnum.ADS;
        signupPart2Request.activity = UserActivityEnum.ACTIVE;
        signupPart2Request.phone = phoneRequest;
        signupPart2Request.veteran = true;
        signupPart2Request.jobId = 2L;
        signupPart2Request.knowUsThroughOtherValue = "test";
        final String jsonInString = mapper.writeValueAsString(signupPart2Request);
        mvc.perform(put(operatorPath + "/complete-register")
            .header("Authorization", "Bearer " + accessToken)
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

    }    @Test
    public void testSignUpPart2_MissingData_thenBadRequest() throws Exception {
        final OperatorCreationRequest signupPart2Request = new OperatorCreationRequest();
        final PhoneRequest phoneRequest = new PhoneRequest();
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Gremda", "Sfax", "3090",
            "Route klm 10");
        phoneRequest.prefix = "216";
        phoneRequest.number = "54765267";
        signupPart2Request.address = address;
        signupPart2Request.birthday = LocalDate.now();
        signupPart2Request.firstName = "Houssem";
        signupPart2Request.lastName = "Triki";
        signupPart2Request.gender = GenderEnum.MALE;
        signupPart2Request.activity = UserActivityEnum.ACTIVE;
        signupPart2Request.phone = phoneRequest;
        signupPart2Request.veteran = true;
        final String jsonInString = mapper.writeValueAsString(signupPart2Request);
        mvc.perform(put(operatorPath + "/complete-register")
            .header("Authorization", "Bearer " + accessToken)
            .content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isBadRequest()).andDo(print());

    }

    @Test
    public void testGetStoreByUserId_thenErrorClient() throws Exception {

        mvc.perform(get(operatorPath + "/first-store")
            .header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }
}
