package fr.hyperion.defmarket.ports.user.usecase;

import java.util.List;

public interface TraderDeleteUseCase {
    void deleteTrader(Long id);

    void deleteTraders(List<Long> ids);
}
