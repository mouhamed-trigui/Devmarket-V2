package fr.hyperion.defmarket.dto.response.user;

import java.time.LocalDate;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.data.user.CompleteRegistration;
import fr.hyperion.defmarket.dto.response.user.contact.PhoneResponse;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public class UpdateTraderResponse {

    public Long id;

    public String firstName;

    public String lastName;

    public GenderEnum gender;

    public UserTypeEnum userType;

    public LocalDate birthday;
    public String birthCity;

    public boolean blocked;

    public boolean expired;

    public boolean mailValidated;

    public boolean deleted;

    public boolean validatedByAdmin;

    public KnowUsThroughEnum knowUsThrough;

    public DocumentsResponse documents;

    public Address address;

    public Job job;

    public PhoneResponse phone;

    public CompleteRegistration completeRegistration;

}
