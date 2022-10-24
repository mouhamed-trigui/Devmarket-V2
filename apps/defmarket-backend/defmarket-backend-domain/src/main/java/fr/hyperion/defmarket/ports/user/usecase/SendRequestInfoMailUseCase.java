package fr.hyperion.defmarket.ports.user.usecase;

public interface SendRequestInfoMailUseCase {
    void sendRequestInfoMail(final Long userId, String subject, String message);

    void sendRequestInfoMailStore(final Long storeId, String subject, String message);

    void sendRequestInfoMailCompany(final Long companyId, String subject, String message);

    void sendRequestInfoMailOffer(final Long offerId, String subject, String message);
}
