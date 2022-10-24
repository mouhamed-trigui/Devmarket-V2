package fr.hyperion.defmarket.data.notification;


import java.time.Instant;
import java.util.List;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.store.StoreCategory;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifStatusEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AdminHistoryNotification {
    private Long id;

    private String message;

    private String title;

    private IconTypeEnum iconType;

    private Instant createdDate;

    private NotifTypeEnum notificationType;

    private StoreTypeEnum storeType;

    private GenderEnum gender;

    private NotifStatusEnum status;

    private List<Address> addressList;

    private StoreCategory storeCategory;

    private Long totalTradersNumber;


}
