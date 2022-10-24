package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.Operator;

public interface UpdateUserEmailAdapter {
    void updateEmail(Operator user, String oldEmail, String newEmail);
}
