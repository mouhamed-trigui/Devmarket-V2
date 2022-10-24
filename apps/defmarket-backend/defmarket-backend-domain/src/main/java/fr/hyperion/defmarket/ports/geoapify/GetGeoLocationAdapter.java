package fr.hyperion.defmarket.ports.geoapify;

import fr.hyperion.defmarket.data.GeoapifyCoordinates;
import fr.hyperion.defmarket.data.contact.Address;

public interface GetGeoLocationAdapter {
    GeoapifyCoordinates getCoordinates(Address address);
}
