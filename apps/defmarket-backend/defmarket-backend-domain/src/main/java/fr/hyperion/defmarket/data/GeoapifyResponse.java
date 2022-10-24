package fr.hyperion.defmarket.data;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeoapifyResponse {
    private List<GeoapifyCoordinates> results;
}
