package fr.hyperion.defmarket.dto.response.historytrace;


import java.time.Instant;
import java.util.List;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifStatusEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTypeEnum;

public class AdminHistoryNotificationResponse {

    public Long id;

    public String message;

    public String title;

    public IconTypeEnum iconType;

    public Instant createdDate;

    public NotifTypeEnum notificationType;

    public StoreTypeEnum storeType;

    public GenderEnum gender;

    public NotifStatusEnum status;

    public List<Address> addressList;

    public Long totalTradersNumber;

    public String storeCategoryName;


}
