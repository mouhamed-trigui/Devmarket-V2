package fr.hyperion.defmarket.dto.response.user;


import java.time.LocalDate;

import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.data.user.CompleteRegistration;
import fr.hyperion.defmarket.dto.response.job.JobResponse;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;

public class UserResponse extends UserBasicResponse {
    public String lastName;
    public LocalDate birthday;
    public Phone phone;
    public boolean veteran;
    public UserActivityEnum activity;
    public DocumentsResponse documents;
    public CompleteRegistration completeRegistration;
    public JobResponse job;

    public String birthCity;
    public String residenceCity;

    public Boolean communication;

    public String crispId;
}
