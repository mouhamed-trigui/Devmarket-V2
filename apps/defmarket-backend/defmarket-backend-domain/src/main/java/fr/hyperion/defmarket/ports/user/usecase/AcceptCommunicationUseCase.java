package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.Operator;

public interface AcceptCommunicationUseCase {
    void acceptCommunication(Operator user, Boolean communication);
}
