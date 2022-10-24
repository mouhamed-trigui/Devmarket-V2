package fr.hyperion.defmarket.adapters.geoapify;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.client.WebClient;

import fr.hyperion.defmarket.data.GeoapifyCoordinates;
import fr.hyperion.defmarket.data.GeoapifyResponse;
import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.enumerated.geoapify.GeoConstantsEnum;
import fr.hyperion.defmarket.ports.geoapify.GetGeoLocationAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GeoapifyAdapter implements GetGeoLocationAdapter {

    private final DefmarketProperty defmarketProperty;
    private WebClient webClient;


    @PostConstruct
    public void init() {
        webClient = WebClient.builder().baseUrl(defmarketProperty.getGeoapify().getUrl()).build();
    }

    @Override
    public GeoapifyCoordinates getCoordinates(final Address address) {
        final GeoapifyResponse response = webClient.get().uri(uriBuilder -> {
            if (StringUtils.hasLength(address.getDepartment())) {
                uriBuilder.queryParam(GeoConstantsEnum.STATE_PARAM.getGeoParam(), address.getDepartment());
            }
            if (StringUtils.hasLength(address.getZipCode())) {
                uriBuilder.queryParam(GeoConstantsEnum.POST_CODE_PARAM.getGeoParam(), address.getZipCode());
            }
            if (StringUtils.hasLength(address.getCity())) {
                uriBuilder.queryParam(GeoConstantsEnum.CITY_PARAM.getGeoParam(), address.getCity());
            }
            if (StringUtils.hasLength(address.getCountry())) {
                uriBuilder.queryParam(GeoConstantsEnum.COUNTRY_PARAM.getGeoParam(), address.getCountry());
            }
            if (StringUtils.hasLength(address.getStreet())) {
                uriBuilder.queryParam(GeoConstantsEnum.STREET_PARAM.getGeoParam(), address.getStreet());
            }
            uriBuilder.queryParam(GeoConstantsEnum.API_KEY_PARAM.getGeoParam(), defmarketProperty.getGeoapify().getApiKey());
            uriBuilder.queryParam(GeoConstantsEnum.FORMAT_PARAM.getGeoParam(), GeoConstantsEnum.JSON_FORMAT.getGeoParam());
            return uriBuilder.build();
        }).retrieve().bodyToMono(GeoapifyResponse.class).block();
        if (response != null) {
            if (response.getResults() != null && !response.getResults().isEmpty()) {
                final GeoapifyCoordinates geoapifyCoordinates = response.getResults().get(0);
                return geoapifyCoordinates;
            }
        }
        return null;
    }


}
