package fr.hyperion.defmarket.ports.user.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.user.Operator;

public interface GetTradersByStoreIdAdapter {
    List<Operator> getUserByStoreId(Long storeId);
}
