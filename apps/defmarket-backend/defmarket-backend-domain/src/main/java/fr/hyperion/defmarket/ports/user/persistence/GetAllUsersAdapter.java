package fr.hyperion.defmarket.ports.user.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface GetAllUsersAdapter {
    Page<DefmarketUser> getAllUsers(Pageable pageable);
}
