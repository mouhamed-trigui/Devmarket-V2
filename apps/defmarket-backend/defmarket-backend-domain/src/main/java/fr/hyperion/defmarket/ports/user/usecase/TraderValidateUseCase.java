package fr.hyperion.defmarket.ports.user.usecase;

public interface TraderValidateUseCase {
    void validateTrader(Long userId);

    void validateTraderInfo(Long traderId);
}
