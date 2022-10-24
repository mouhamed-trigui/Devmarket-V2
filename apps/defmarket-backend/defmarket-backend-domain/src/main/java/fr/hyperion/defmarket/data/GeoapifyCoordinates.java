package fr.hyperion.defmarket.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeoapifyCoordinates {
    private Double lat;
    private Double lon;
}
