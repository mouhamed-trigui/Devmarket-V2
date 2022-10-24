package fr.hyperion.defmarket.dto.request.user;

import java.time.LocalDate;

import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;

public class TraderUpdateRequest {
    public String firstName;

    public String lastName;

    public LocalDate birthday;

    public String birthCity;

    public String residenceCity;

    public PhoneRequest phone;

    public Long jobId;

}
