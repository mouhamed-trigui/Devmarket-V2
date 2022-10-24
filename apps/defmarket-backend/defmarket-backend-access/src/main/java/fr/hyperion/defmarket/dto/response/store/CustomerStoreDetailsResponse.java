package fr.hyperion.defmarket.dto.response.store;

import java.util.List;

import fr.hyperion.defmarket.data.PersonalInfo;
import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.data.internet.SocialMedia;
import fr.hyperion.defmarket.data.paymentMethod.PaymentMethod;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.dto.response.offer.OfferResponse;
import fr.hyperion.defmarket.dto.response.timetable.TimetableResponse;

public class CustomerStoreDetailsResponse extends StoreResponse {

	public int offerNbr;

	public String email;

	public List<Phone> phoneList;

	public PersonalInfo<String> website;

	public List<SocialMedia> socialMedia;

	public TemporaryClosure temporaryClosure;

	public List<PaymentMethod> paymentMethods;

	public StoreCategory category;

	public List<OfferResponse> offers;

	public List<TimetableResponse> timeTable;

}
