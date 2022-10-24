package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GetAllUsersOfFamilyUseCase {
  Page<DefmarketUser> getAllUsersOfFamily(Long familyId, Pageable pageable);
  Page<DefmarketUser> getAllUsersOfFamily(String familyCode, Pageable pageable);
}
