package fr.hyperion.defmarket.common.mappers;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.contact.Geolocation;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface GeolocationDBMapper {

    default Geolocation map(final Geometry point) {
        if (point == null) {
            return null;
        }
        return new Geolocation(point.getCoordinate().getX(), point.getCoordinate().getY());
    }

    default Point toPoint(final Geolocation geolocation) {
        if (geolocation == null) {
            return null;
        }
        final GeometryFactory factory = new GeometryFactory(new PrecisionModel(), 4326);
        final Coordinate coordinate = new Coordinate(geolocation.getX(), geolocation.getY());
        return factory.createPoint(coordinate);
    }
}
