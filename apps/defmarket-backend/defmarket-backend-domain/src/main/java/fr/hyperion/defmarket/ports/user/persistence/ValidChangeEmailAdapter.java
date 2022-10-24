package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.Operator;

public interface ValidChangeEmailAdapter {
    void changeEmail(Operator user);
}
