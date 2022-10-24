package fr.hyperion.defmarket.data.notification;


import java.time.Instant;

import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserNotification {
    private Long id;

    private String message;

    private String title;

    private IconTypeEnum iconType;

    private Long ownerId;

    private Instant createdDate;

}
