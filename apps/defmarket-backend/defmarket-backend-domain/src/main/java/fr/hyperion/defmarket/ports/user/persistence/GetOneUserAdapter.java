package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface GetOneUserAdapter {
    DefmarketUser getUserById(Long id);
}
