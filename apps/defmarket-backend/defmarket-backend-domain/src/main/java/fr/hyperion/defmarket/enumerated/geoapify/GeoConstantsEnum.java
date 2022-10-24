package fr.hyperion.defmarket.enumerated.geoapify;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum GeoConstantsEnum {
    STREET_PARAM("street"),
    CITY_PARAM("city"),
    STATE_PARAM("state"),
    POST_CODE_PARAM("postcode"),
    COUNTRY_PARAM("country"),
    HOUSENUMBER_PARAM("houseumber"),
    API_KEY_PARAM("apiKey"),
    FORMAT_PARAM("format"),
    JSON_FORMAT("json");

    private String GeoParam;

}
