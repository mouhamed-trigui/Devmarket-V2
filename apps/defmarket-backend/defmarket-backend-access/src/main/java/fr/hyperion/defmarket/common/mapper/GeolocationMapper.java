package fr.hyperion.defmarket.common.mapper;

import fr.hyperion.defmarket.data.contact.Geolocation;
import fr.hyperion.defmarket.dto.request.user.GeolocationRequest;
import fr.hyperion.defmarket.dto.response.user.GeolocationResponse;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface GeolocationMapper {

    default Geolocation toData(final GeolocationRequest geolocation) {
        if (geolocation == null) {
            return null;
        }
        return new Geolocation(geolocation.longitude, geolocation.latitude);
    }

    @Mapping(target = "longitude", source = "x")
    @Mapping(target = "latitude", source = "y")
    GeolocationResponse toResponse(Geolocation geolocation);

    default Point map(final Coordinate geolocation) {
        if (geolocation == null) {
            return null;
        }
        final GeometryFactory factory = new GeometryFactory(new PrecisionModel(), 4326);
        final Coordinate coordinate = new Coordinate(geolocation.getX(), geolocation.getY());
        return factory.createPoint(coordinate);
    }
}
