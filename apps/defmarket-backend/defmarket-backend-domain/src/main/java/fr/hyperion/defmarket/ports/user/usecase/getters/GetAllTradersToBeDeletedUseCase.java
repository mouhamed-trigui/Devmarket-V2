package fr.hyperion.defmarket.ports.user.usecase.getters;

import java.util.List;

public interface GetAllTradersToBeDeletedUseCase {
    List<Long> getAllTradersToBeDeleted();
}
