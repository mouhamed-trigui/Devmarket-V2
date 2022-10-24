package fr.hyperion.defmarket.ports.conciergerieUserAccount.persistence;

import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.data.conciergerieUserAccount.RegisterRequest;

public interface CreateConciergerieUserAccountAdapter {
    ConciergerieUserAccount create(RegisterRequest registerRequest, Long userId);
}
