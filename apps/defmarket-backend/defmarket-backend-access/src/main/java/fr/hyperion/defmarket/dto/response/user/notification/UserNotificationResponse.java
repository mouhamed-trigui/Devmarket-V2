package fr.hyperion.defmarket.dto.response.user.notification;


import java.time.Instant;

import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;

public class UserNotificationResponse {

    public Long id;

    public String message;

    public String title;

    public Long ownerId;

    public IconTypeEnum iconType;

    public Instant createdDate;

}
