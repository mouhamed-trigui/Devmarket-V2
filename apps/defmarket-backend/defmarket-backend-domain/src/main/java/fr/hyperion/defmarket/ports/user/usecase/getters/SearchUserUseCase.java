package fr.hyperion.defmarket.ports.user.usecase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface SearchUserUseCase {

    Page<UserAccount> searchByDetails(Pageable pageable, String input, UserTypeEnum userType);
}
