package fr.hyperion.defmarket.data.contact;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    private String country;
    private String department;
    private String city;
    private String street;
    private String zipCode;
}
