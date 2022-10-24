package fr.hyperion.defmarket.controller.company;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.AbstractControllerTest;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.dto.request.company.CompanyCreationRequest;
import fr.hyperion.defmarket.dto.request.company.CompanyUpdateRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.enumerated.company.CompanyTypeEnum;
import fr.hyperion.defmarket.enumerated.company.LeaderTypeEnum;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CompanyControllerTest extends AbstractControllerTest {


    List<Company> companies;
    final String companyPath = AbstractController.APP_PREFIX + "/pro/company";
    String accessToken;


    @BeforeEach
    public void setup() throws Exception {
        accessToken = obtainAccessToken("triki@gmail.com", "Triki99..", UserTypeEnum.TRADER);
        final Company company = new Company();
        company.setId(1L);
        company.setCompanyType(CompanyTypeEnum.PROFESSIONAL);
        company.setLeaderType(LeaderTypeEnum.MANAGER);
        company.setName("ByrsaTech");
        companies = List.of(company);
    }


    @Test
    void testGetByID_returnUnauthorized() throws Exception {
        mvc.perform(get(companyPath + "/1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isUnauthorized());
    }

    @Test
    void testGetByID_returnCompanyResponse_exist() throws Exception {
        mvc.perform(get(companyPath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            .andExpect(content().contentType("application/json")).andExpect(jsonPath("$.name", is("Byrsa Tech")));
    }

    @Test
    void testGetByID_returnCompanyResponse_notExist() throws Exception {
        mvc.perform(get(companyPath + "/{id}", 100L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    void testGetAllMyCompany_returnCompanyResponse() throws Exception {
        mvc.perform(get(companyPath).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    public void testCreateCompany_thenOk() throws Exception {
        final CompanyCreationRequest creationRequest = new CompanyCreationRequest();
        creationRequest.setCompanyType(CompanyTypeEnum.PROFESSIONAL);
        creationRequest.setLeaderType(LeaderTypeEnum.MANAGER);
        creationRequest.setName("Primatec");
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Sakiet ezzit", "Sfax", "3050",
            "Route de tunis klm 10");
        creationRequest.setAddress(address);
        creationRequest.setSiren("ZWYEG598");
        creationRequest.setTva("19");
        final String jsonInString = mapper.writeValueAsString(creationRequest);
        mvc.perform(post(companyPath).header("Authorization", "Bearer " + accessToken).content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    public void testCreateCompany_MissingName_thenValidationError() throws Exception {
        final CompanyCreationRequest creationRequest = new CompanyCreationRequest();
        creationRequest.setCompanyType(CompanyTypeEnum.PROFESSIONAL);
        creationRequest.setLeaderType(LeaderTypeEnum.MANAGER);
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Sakiet ezzit", "Sfax", "3050",
            "Route de tunis klm 10");
        creationRequest.setAddress(address);
        creationRequest.setSiren("123");
        creationRequest.setTva("19");
        final String jsonInString = mapper.writeValueAsString(creationRequest);
        mvc.perform(post(companyPath).header("Authorization", "Bearer " + accessToken).content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    public void testUpdateCompany_thenOk() throws Exception {
        final CompanyUpdateRequest companyUpdateRequest = new CompanyUpdateRequest();
        companyUpdateRequest.setCompanyType(CompanyTypeEnum.PROFESSIONAL);
        companyUpdateRequest.setLeaderType(LeaderTypeEnum.MANAGER);
        companyUpdateRequest.setName("ByrsaTech");
        companyUpdateRequest.setSiren("123");
        companyUpdateRequest.setTva("19");
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Sfax Ville", "Sfax", "3002",
            "Avenue 5 Août rue 9 juillet N°8");
        companyUpdateRequest.setAddress(address);
        final String jsonInString = mapper.writeValueAsString(companyUpdateRequest);
        mvc.perform(put(companyPath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken).content(jsonInString)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
            .andExpect(jsonPath("$.address.street", is("Avenue 5 Août rue 9 juillet N°8")));
    }

    @Test
    public void testUpdateCompany_WrongId_thenClientError() throws Exception {
        final CompanyUpdateRequest companyUpdateRequest = new CompanyUpdateRequest();
        companyUpdateRequest.setCompanyType(CompanyTypeEnum.PROFESSIONAL);
        companyUpdateRequest.setLeaderType(LeaderTypeEnum.MANAGER);
        companyUpdateRequest.setName("ByrsaTech");
        companyUpdateRequest.setSiren("123");
        companyUpdateRequest.setTva("19");
        final AddressDetailedRequest address = new AddressDetailedRequest("Tunisia", "Sfax Ville", "Sfax", "3002",
            "Avenue 5 Août rue 9 juillet N°8");
        companyUpdateRequest.setAddress(address);
        final String jsonInString = mapper.writeValueAsString(companyUpdateRequest);
        mvc.perform(put(companyPath + "/{id}", 10L).header("Authorization", "Bearer " + accessToken).content(jsonInString)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }

    @Test
    public void testDeleteCompany_thenOk() throws Exception {
        mvc.perform(delete(companyPath + "/{id}", 1L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    public void testDeleteCompany_WrongId_thenClientError() throws Exception {
        mvc.perform(delete(companyPath + "/{id}", 10L).header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON)).andExpect(status().is4xxClientError());
    }
}
