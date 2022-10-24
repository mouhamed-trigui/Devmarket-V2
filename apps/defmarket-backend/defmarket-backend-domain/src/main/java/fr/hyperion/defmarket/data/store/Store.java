package fr.hyperion.defmarket.data.store;

import java.util.List;

import fr.hyperion.defmarket.data.PersonalInfo;
import fr.hyperion.defmarket.data.company.Company;
import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.contact.Geolocation;
import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.internet.SocialMedia;
import fr.hyperion.defmarket.data.paymentMethod.PaymentMethod;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Store {

    private Long id;

    private StoreTypeEnum storeType;

    private Document logo;

    private Document cover;

    private String name;

    private String description;

    private Company company;

    private Address address;

    private Geolocation geolocation;

    private List<Phone> phoneList;

    private PersonalInfo<String> website;

    private List<SocialMedia> socialMedia;

    private String email;

    private boolean hideMyContacts;

    private boolean visible;

    private boolean deleted;

    private boolean validatedByAdmin;

    private boolean eCommerceAndPhysicalStore;

    private PracticedOfferBeforeDM practicedOfferBeforeDM;

    private int offerNbr;

    private boolean blocked = false;

    private TemporaryClosure temporaryClosure;

    private List<PaymentMethod> paymentMethods;

    private StoreCategory category;

    private Double distance;
}
