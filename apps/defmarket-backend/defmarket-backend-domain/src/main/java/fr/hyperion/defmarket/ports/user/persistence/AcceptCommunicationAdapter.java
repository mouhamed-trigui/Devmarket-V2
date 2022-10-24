package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.Operator;

public interface AcceptCommunicationAdapter {
    void acceptCommunication(Operator user, Boolean communication);
}
