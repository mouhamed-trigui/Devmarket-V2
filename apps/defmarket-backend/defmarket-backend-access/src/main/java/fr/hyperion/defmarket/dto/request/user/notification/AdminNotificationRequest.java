package fr.hyperion.defmarket.dto.request.user.notification;


import java.util.List;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTypeEnum;

public class AdminNotificationRequest {

    public String message;

    public String title;

    public NotifTypeEnum notificationType;

    public StoreTypeEnum storeType;

    public GenderEnum gender;

    public List<Address> addressList;

    public Long storeCategoryId;

}
