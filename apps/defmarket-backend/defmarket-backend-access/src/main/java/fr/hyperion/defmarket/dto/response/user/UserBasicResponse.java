package fr.hyperion.defmarket.dto.response.user;

import java.time.Instant;
import java.util.List;

import fr.hyperion.defmarket.enumerated.GenderEnum;

public class UserBasicResponse {
    public Long id;
    public String firstName;
    public String email;
    public GenderEnum gender;
    public boolean pushNotificationActive;
    public boolean validatedByAdmin;
    public boolean validatedInfoByAdmin;

    public Instant deleteRequestDate;
    public List<String> roles;
    public boolean blocked;
    public String crispId;
}
