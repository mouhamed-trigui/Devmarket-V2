package fr.hyperion.defmarket.ports.conciergerieUserAccount.usecase;

public interface SendMessageConciergerieUseCase {
    void sendMessage(final String message, final Long userId);
}
