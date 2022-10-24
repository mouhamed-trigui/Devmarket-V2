package fr.hyperion.defmarket.ports.user.persistence;

import java.util.List;

public interface GetAllTradersToBeDeletedAdapter {
    List<Long> getAllTradersToBeDeleted();
}
