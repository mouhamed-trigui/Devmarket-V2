package fr.hyperion.defmarket.ports.store.useCase;

public interface BlockAllStoreActionUseCase {
    void blockAllStoreAction(Long companyId, Boolean blockAction);
}
