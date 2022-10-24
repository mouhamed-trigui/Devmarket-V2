package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GetAllUsersUseCase {
  Page<DefmarketUser> getAllUsers(Pageable pageable);
}
