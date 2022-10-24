package fr.hyperion.defmarket.dto.request.store;

import fr.hyperion.defmarket.dto.request.user.GeolocationRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerStoreFilterRequest {

    public GeolocationRequest geolocation;
    public Long categoryId;
    public Double distance;
    public String city;

}
