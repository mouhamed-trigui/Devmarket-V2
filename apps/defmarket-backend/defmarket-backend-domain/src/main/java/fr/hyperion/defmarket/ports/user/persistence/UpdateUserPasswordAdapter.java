package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface UpdateUserPasswordAdapter {
    DefmarketUser updatePassword(DefmarketUser user, String newPassword);
}
