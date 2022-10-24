package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.data.user.UserAccount;

public interface UpdateUserAdapter {
    DefmarketUser update(UserAccount user);

    DefmarketUser updateIdentity(Operator user);

    DefmarketUser updateProfile(UserAccount user);
}
