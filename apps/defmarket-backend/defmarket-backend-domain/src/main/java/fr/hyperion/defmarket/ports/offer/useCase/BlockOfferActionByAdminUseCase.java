package fr.hyperion.defmarket.ports.offer.useCase;

public interface BlockOfferActionByAdminUseCase {
    void blockOfferActionByAdmin(Long offerId, Boolean blockAction, String reason);
}
