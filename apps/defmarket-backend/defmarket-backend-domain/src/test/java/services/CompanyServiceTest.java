package services;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.ports.company.event.NotificationEventPort;
import fr.hyperion.defmarket.ports.company.persistence.CreateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetAllCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetCompanyBySirenAdapter;
import fr.hyperion.defmarket.ports.company.persistence.GetOneCompanyAdapter;
import fr.hyperion.defmarket.ports.company.persistence.UpdateCompanyAdapter;
import fr.hyperion.defmarket.ports.company.usecase.DeleteCompanyUseCase;
import fr.hyperion.defmarket.ports.store.useCase.DeleteAllStoreUseCase;
import fr.hyperion.defmarket.ports.user.persistence.GetOneUserAdapter;
import fr.hyperion.defmarket.service.company.CompanyServiceImpl;


@ExtendWith(MockitoExtension.class)
public class CompanyServiceTest {

    @InjectMocks
    private CompanyServiceImpl companyService;

    @Mock
    private DeleteAllStoreUseCase deleteAllStoreUseCase;
    @Mock
    private DeleteCompanyUseCase deleteCompanyUseCase;
    @Mock
    private CreateCompanyAdapter createCompanyAdapter;
    @Mock
    private UpdateCompanyAdapter updateCompanyAdapter;
    @Mock
    private GetOneCompanyAdapter getOneCompanyAdapter;
    @Mock
    private GetAllCompanyAdapter getAllComanyAdapter;
    @Mock
    private GetOneUserAdapter getOneUserAdapter;
    @Mock
    private NotificationEventPort notificationEventPort;
    @Mock
    private GetCompanyBySirenAdapter getCompanyBySirenAdapter;

    private Company company;

    @BeforeEach
    public void setup() {
        System.out.println("Initalizing Data");
        company = new Company();
        company.setId(1L);
        final DefmarketUser defmarketUser = new DefmarketUser();
        defmarketUser.setExpoTokens(Collections.emptySet());
        defmarketUser.setId(1L);

    }

    @Test
    public void shouldCreate() {
        final Long ownerId = 1L;
        final Company companyToCreate = new Company();
        companyToCreate.setSiren("XCSTDYH");
        when(getCompanyBySirenAdapter.getBySiren(anyString())).thenReturn(new ArrayList<>());
        when(createCompanyAdapter.create(any(Company.class), anyLong())).thenReturn(company);
        assertEquals(company, companyService.create(companyToCreate, ownerId));
    }

    @Test
    public void shouldUpdate() {
        when(updateCompanyAdapter.update(any(Company.class))).thenReturn(company);
        assertEquals(company, companyService.update(company));
    }

    @Test
    public void shouldGetOne() {
        final long id = 1L;
        when(getOneCompanyAdapter.getById(anyLong())).thenReturn(company);
        assertEquals(company, companyService.getById(id));
    }

    @Test
    public void shouldGetAll() {
        final long id = 1;
        final List<Company> subList = new ArrayList<>();
        subList.add(company);
        when(getAllComanyAdapter.getAllByOwnerId(anyLong())).thenReturn(subList);
        assertEquals(subList, companyService.getByOwnerId(id));
    }

    @Test
    public void shouldDelete() {
        when(getOneCompanyAdapter.getById(anyLong())).thenReturn(company);
        when(updateCompanyAdapter.update(any(Company.class))).thenReturn(company);
        doNothing().when(deleteAllStoreUseCase).deleteAllStore(anyLong());
        assertDoesNotThrow(() -> companyService.delete(2L));
    }

}
