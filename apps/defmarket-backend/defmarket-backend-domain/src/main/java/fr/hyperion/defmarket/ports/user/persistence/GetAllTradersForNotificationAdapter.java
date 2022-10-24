package fr.hyperion.defmarket.ports.user.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;

public interface GetAllTradersForNotificationAdapter {
    List<Operator> getAllTradersForNotification(List<Address> addressList, StoreTypeEnum storeType, Long storeCategoryId);
}
