package services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.ports.offer.useCase.getters.GetNbOffersUseCase;
import fr.hyperion.defmarket.ports.store.persistence.CreateStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllLocalStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetAllStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByIdWithOffersAndTimeTableAdapter;
import fr.hyperion.defmarket.ports.store.persistence.GetStoreByUserIdAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateCoverStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateLogoStoreAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreTemporaryClosureAdapter;
import fr.hyperion.defmarket.ports.store.persistence.UpdateStoreVisibilityAdapter;
import fr.hyperion.defmarket.service.store.StoreCustomerServiceImpl;
import fr.hyperion.defmarket.service.store.StoreServiceImpl;


@ExtendWith(MockitoExtension.class)
public class StoreServiceTest {

    @InjectMocks
    private StoreServiceImpl storeService;
    @InjectMocks
    private StoreCustomerServiceImpl storeCustomerService;
    @Mock
    private CreateStoreAdapter createStoreAdapter;
    @Mock
    private UpdateLogoStoreAdapter updateLogoStoreAdapter;
    @Mock
    private UpdateCoverStoreAdapter updateCoverStoreAdapter;
    @Mock
    private UpdateStoreVisibilityAdapter updateStoreVisibilityAdapter;
    @Mock
    private UpdateStoreTemporaryClosureAdapter updateStoreTemporaryClosureAdapter;
    @Mock
    private GetStoreByIdAdapter getStoreByIdAdapter;
    @Mock
    private GetStoreByUserIdAdapter getStoreByUserIdAdapter;
    @Mock
    private GetAllStoreAdapter getAllStoreAdapter;
    @Mock
    private GetNbOffersUseCase getNbOffersUseCase;
    @Mock
    private GetAllLocalStoreAdapter getAllLocalStoreAdapter;
    @Mock
    private GetStoreByIdWithOffersAndTimeTableAdapter getStoreByIdWithOffersAndTimeTableAdapter;

    private Store store;
    private StoreWithTimeTable storeWithTimeTable;
    private StoreWithOffersAndTimeTable storeWithOffersAndTimeTable;
    private final File logo = new File("/file/upload/certif.png");
    private final Document document = new Document();

    private final Pageable pageable = PageRequest.of(0, 5);

    @BeforeEach
    public void setup() {
        System.out.println("Initalizing Data");
        store = new Store();
        storeWithTimeTable = new StoreWithTimeTable();
        storeWithOffersAndTimeTable = new StoreWithOffersAndTimeTable();
        store.setId(1L);
        final Company company = new Company();
        company.setId(1L);
        final DefmarketUser defmarketUser = new DefmarketUser();
        defmarketUser.setExpoTokens(Collections.emptySet());
        defmarketUser.setId(1L);

        document.setId(1L);
        document.setSize(logo.length());
        document.setName(logo.getName());
        document.setPath(logo.getPath());
    }

    @Test
    public void shouldCreate() {
        final Long companyId = 1L;
        when(createStoreAdapter.create(any(Store.class), anyLong())).thenReturn(store);
        assertEquals(store, storeService.create(new Store(), companyId));
    }

    @Test
    public void shouldGetOne() {
        final long id = 1L;
        final long nbOffer = 5L;
        when(getStoreByIdAdapter.getStoreById(anyLong())).thenReturn(store);
        when(getNbOffersUseCase.getNbOffers(anyLong())).thenReturn(nbOffer);
        assertEquals(store, storeService.getById(id));
    }

    @Test
    public void shouldGetStorebyUserId() {
        final Long ownerId = 1L;
        when(getStoreByUserIdAdapter.getByUserId(anyLong())).thenReturn(store);
        assertEquals(store, storeService.getFirstStoreByUserId(ownerId));
    }

    @Test
    public void shouldGetAll() {
        final long id = 1;
        final long nbOffer = 6;
        final List<Store> subList = new ArrayList<>();
        subList.add(store);
        when(getNbOffersUseCase.getNbOffers(anyLong())).thenReturn(nbOffer);
        when(getAllStoreAdapter.getAll(anyLong())).thenReturn(subList);
        assertEquals(subList, storeService.getAll(id));
    }


    @Test
    public void shouldUpdateCover() throws IOException {
        when(updateCoverStoreAdapter.updateCover(any(Document.class), anyLong())).thenReturn(store);
        assertEquals(store, storeService.updateCover(document, document.getId()));
    }

    @Test
    public void shouldUpdateLogo() throws IOException {
        when(updateLogoStoreAdapter.updateLogo(any(Document.class), anyLong())).thenReturn(store);
        assertEquals(store, storeService.updateLogo(document, document.getId()));
    }


    @Test
    public void shouldUpdateVisibility() {
        final long id = 1L;
        when(updateStoreVisibilityAdapter.updateVisibility(anyLong())).thenReturn(store);
        assertEquals(store, storeService.updateVisibility(id));
    }

    @Test
    public void shouldUpdateTemporaryClosure() {
        final long id = 1L;
        final TemporaryClosure temporaryClosure = new TemporaryClosure();
        when(updateStoreTemporaryClosureAdapter.updateTemporaryClosure(anyLong(), any(TemporaryClosure.class))).thenReturn(store);
        assertEquals(store, storeService.updateTemporaryClosure(id, temporaryClosure));
    }

    @Test
    public void shouldGetAllLocalStore() {
        final CustomerStoreFilter customerStoreFilter = new CustomerStoreFilter();
        final List<StoreWithTimeTable> stores = List.of(storeWithTimeTable);
        final Page<StoreWithTimeTable> result = new PageImpl<>(stores, pageable, stores.size());
        when(getAllLocalStoreAdapter.getAllLocalStore(any(Pageable.class), any(CustomerStoreFilter.class))).thenReturn(result);
        assertEquals(stores, storeCustomerService.getAllLocalStore(pageable, customerStoreFilter).getContent());

    }

    @Test
    public void shouldGetStoreByIdWithOffersAndTimeTable() {
        final long id = 1L;
        storeWithOffersAndTimeTable.setId(1L);
        when(getStoreByIdWithOffersAndTimeTableAdapter.getStoreByIdWithOffersAndTimeTable(anyLong())).thenReturn(storeWithOffersAndTimeTable);
        assertEquals(store, storeCustomerService.getStoreByIdWithOffersAndTimeTable(id));
    }

}
