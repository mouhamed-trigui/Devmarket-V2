package fr.hyperion.defmarket.data.store;

import fr.hyperion.defmarket.data.contact.Geolocation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerStoreFilter {
    private Geolocation geolocation;
    private Long categoryId;
    private Double distance;
    private String city;
}
