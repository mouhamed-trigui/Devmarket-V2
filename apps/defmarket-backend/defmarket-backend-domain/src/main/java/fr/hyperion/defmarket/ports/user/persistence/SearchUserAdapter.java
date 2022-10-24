package fr.hyperion.defmarket.ports.user.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface SearchUserAdapter {

    Page<UserAccount> searchByDetails(Pageable pageable, String input, UserTypeEnum userType);
}
