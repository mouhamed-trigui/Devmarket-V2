package fr.hyperion.defmarket.dto.request.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeolocationRequest {
    public double latitude;
    public double longitude;
}
