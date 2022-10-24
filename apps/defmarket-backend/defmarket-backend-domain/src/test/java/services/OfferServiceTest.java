package services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.ports.offer.persistence.CreateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.GetOneOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateFileOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdateOfferAdapter;
import fr.hyperion.defmarket.ports.offer.persistence.UpdatePhotoOfferAdapter;
import fr.hyperion.defmarket.service.exceptions.FileException;
import fr.hyperion.defmarket.service.exceptions.OfferValueException;
import fr.hyperion.defmarket.service.offer.CustomerOfferServiceImpl;
import fr.hyperion.defmarket.service.offer.OfferServiceImpl;


@ExtendWith(MockitoExtension.class)
public class OfferServiceTest {


    @InjectMocks
    private OfferServiceImpl offerService;
    @InjectMocks
    private CustomerOfferServiceImpl customerOfferService;

    @Mock
    private CreateOfferAdapter createOfferAdapter;
    @Mock
    private UpdateOfferAdapter updateOfferAdapter;
    @Mock
    private UpdatePhotoOfferAdapter updatePhotoOfferAdapter;
    @Mock
    private UpdateFileOfferAdapter updateAttachedFile;
    @Mock
    private GetOneOfferAdapter getOneOfferAdapter;

    private Offer offer;

    @BeforeEach
    public void setup() {
        System.out.println("Initalizing Data");
        final Store store = new Store();
        store.setId(1L);

        offer = new Offer();
        offer.setId(1L);
        offer.setStore(store);
        offer.setMaxOfferValue("40");
        offer.setMinOfferValue("40");
        offer.setMidOfferValue("40");
        offer.setOfferType(OfferTypeEnum.PERCENTAGE);
        offer.setDescription("first test");

        final DefmarketUser defmarketUser = new DefmarketUser();
        defmarketUser.setExpoTokens(Collections.emptySet());
        defmarketUser.setId(1L);

    }

    @Test
    public void shouldCreate() {
        when(createOfferAdapter.create(any(Offer.class), anyLong())).thenReturn(offer);
        assertEquals("first test", offerService.create(offer, offer.getStore().getId()).getDescription());
    }

    @Test
    public void InvalidOfferMinValue() {
        offer.setMinOfferValue("3");
        offer.setOfferType(OfferTypeEnum.PERCENTAGE);
        final Exception exception = assertThrows(OfferValueException.class, () -> offerService.create(offer,
            offer.getStore().getId()));
        final String expectedMessage = "Invalid Min Offer Value";
        final String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));

        offer.setOfferType(OfferTypeEnum.FLAT);
        offer.setMinOfferValue("0.5");
        final Exception exception2 = assertThrows(OfferValueException.class, () -> offerService.create(offer,
            offer.getStore().getId()));
        final String actualMessage2 = exception2.getMessage();
        assertTrue(actualMessage2.contains(expectedMessage));
    }

    @Test
    public void InvalidOfferMidValue() {
        offer.setMinOfferValue(null);
        offer.setMidOfferValue("3");
        offer.setOfferType(OfferTypeEnum.PERCENTAGE);
        final Exception exception = assertThrows(OfferValueException.class, () -> offerService.create(offer,
            offer.getStore().getId()));
        final String expectedMessage = "Invalid Mid Offer Value";
        final String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));

        offer.setOfferType(OfferTypeEnum.FLAT);
        offer.setMidOfferValue("0.5");
        final Exception exception2 = assertThrows(OfferValueException.class, () -> offerService.create(offer,
            offer.getStore().getId()));
        final String actualMessage2 = exception2.getMessage();
        assertTrue(actualMessage2.contains(expectedMessage));
    }

    @Test
    public void shouldNotCreateOfferValueNull() {
        offer.setMaxOfferValue(null);
        offer.setMinOfferValue(null);
        offer.setMidOfferValue(null);
        final Exception exception = assertThrows(OfferValueException.class, () -> offerService.create(offer,
            offer.getStore().getId()));
        final String expectedMessage = "Min, Mid & Max Offer Value are null";
        final String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }


    @Test
    public void shouldUpdate() {
        offer.setBlocked(true);
        offer.setValidatedByAdmin(true);
        offer.setDescription("salam");
        when(updateOfferAdapter.update(any(Offer.class), anyLong())).thenReturn(offer);
        assertTrue(offerService.update(offer, offer.getId()).isBlocked());
        assertEquals("salam", offerService.update(offer, offer.getId()).getDescription());
    }


    @Test
    void shouldUpdateImage() throws FileException {
        when(updatePhotoOfferAdapter.updatePhoto(any(Document.class), anyLong())).thenReturn(offer);
        assertEquals(offer, offerService.updatePhoto(new Document(), offer.getId()));
    }

    @Test
    void shouldUpdateFile() throws FileException {
        when(updateAttachedFile.updateAttachedFile(any(Document.class), anyLong())).thenReturn(offer);
        assertEquals(offer, offerService.updateAttachedFile(new Document(), offer.getId()));
    }


    @Test
    public void shouldGetOne() {
        when(getOneOfferAdapter.getById(anyLong())).thenReturn(offer);
        assertEquals(offer, offerService.getById(2L));
    }

    @Test
    public void shouldGetOneCustomerOffer() {
        when(getOneOfferAdapter.getById(anyLong())).thenReturn(offer);
        assertEquals(offer, customerOfferService.getOfferById(2L));
    }
}
