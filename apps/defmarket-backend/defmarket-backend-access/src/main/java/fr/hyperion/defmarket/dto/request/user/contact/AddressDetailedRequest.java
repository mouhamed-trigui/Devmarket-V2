package fr.hyperion.defmarket.dto.request.user.contact;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressDetailedRequest {
    public String country;
    public String department;
    public String city;
    public String zipCode;
    public String street;
}
