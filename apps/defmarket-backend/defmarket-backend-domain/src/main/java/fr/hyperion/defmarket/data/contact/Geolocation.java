package fr.hyperion.defmarket.data.contact;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.geo.Point;

@Getter
@Setter
public class Geolocation extends Point {

  public Geolocation(double x, double y) {
    super(x, y);
  }

  public Geolocation(Point point) {
    super(point);
  }
}
