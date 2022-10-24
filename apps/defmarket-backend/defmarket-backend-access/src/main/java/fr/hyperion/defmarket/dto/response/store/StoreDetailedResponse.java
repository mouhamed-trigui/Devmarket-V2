package fr.hyperion.defmarket.dto.response.store;

import java.util.List;

import fr.hyperion.defmarket.data.PersonalInfo;
import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.paymentMethod.PaymentMethod;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.dto.response.DocumentResponse;
import fr.hyperion.defmarket.dto.response.timetable.TemporaryClosureResponse;
import fr.hyperion.defmarket.dto.response.user.GeolocationResponse;
import fr.hyperion.defmarket.dto.response.user.contact.PhoneResponse;
import fr.hyperion.defmarket.dto.response.user.contact.SocialMediaResponse;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
public class StoreDetailedResponse {
    public Long id;
    public String name;
    public String description;
    public DocumentResponse logo;
    public DocumentResponse cover;

    public StoreTypeEnum storeType;

    public boolean visible;

    public Address address;

    public GeolocationResponse geolocation;

    public List<PhoneResponse> phoneList;

    public PersonalInfo<String> website;

    public String email;

    public boolean hideMyContacts;

    public List<SocialMediaResponse> socialMedia;

    public boolean eCommerceAndPhysicalStore;

    public TemporaryClosureResponse temporaryClosure;

    public PracticedOfferBeforeDM practicedOfferBeforeDM;

    public int offerNbr;

    public List<PaymentMethod> paymentMethods;

    public StoreCategory category;

    public boolean validatedByAdmin;
}
