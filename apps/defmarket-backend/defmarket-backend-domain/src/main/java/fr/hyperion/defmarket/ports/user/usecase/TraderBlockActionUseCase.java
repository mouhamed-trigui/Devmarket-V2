package fr.hyperion.defmarket.ports.user.usecase;

public interface TraderBlockActionUseCase {
    void blockActionTrader(Long userId, boolean blockAction, String reason);

}
