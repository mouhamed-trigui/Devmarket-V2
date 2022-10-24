package fr.hyperion.defmarket.ports.store.useCase;

public interface BlockStoreByAdminActionUseCase {
    void blockStoreAction(final Long id, Boolean blockAction, final String reason);
}
