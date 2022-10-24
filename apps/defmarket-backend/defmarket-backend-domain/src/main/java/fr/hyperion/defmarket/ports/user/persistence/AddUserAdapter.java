package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface AddUserAdapter {
    DefmarketUser addUser(DefmarketUser user);
}
