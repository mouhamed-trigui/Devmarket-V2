package fr.hyperion.defmarket.dto.request.user;

import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;

public class UserUpdateRequest {
    public String firstName;
    public GenderEnum gender;
    public UserActivityEnum activity;
    public Long jobId;
}
