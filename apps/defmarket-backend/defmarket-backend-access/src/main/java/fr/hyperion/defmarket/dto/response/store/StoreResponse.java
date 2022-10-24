package fr.hyperion.defmarket.dto.response.store;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.dto.response.DocumentResponse;
import fr.hyperion.defmarket.dto.response.user.GeolocationResponse;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.Data;

@Data
public class StoreResponse {

	public Long id;

	public String name;

	public String description;

	public DocumentResponse logo;

	public DocumentResponse cover;

	public boolean eCommerceAndPhysicalStore;

	public StoreTypeEnum storeType;

	public boolean validatedByAdmin;

	public boolean visible;

	public boolean blocked;

	public Address address;

	public GeolocationResponse geolocation;
	
	public int offerNbr;

}
