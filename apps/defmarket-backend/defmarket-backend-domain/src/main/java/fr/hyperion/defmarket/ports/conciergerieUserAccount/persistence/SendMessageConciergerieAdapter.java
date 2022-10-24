package fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence;


public interface SendMessageConciergerieAdapter {
    String sendMessage(final String message, final String conversationId);
}
