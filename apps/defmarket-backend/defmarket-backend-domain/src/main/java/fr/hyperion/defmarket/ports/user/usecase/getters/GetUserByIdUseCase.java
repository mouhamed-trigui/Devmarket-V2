package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.DefmarketUser;

public interface GetUserByIdUseCase {
  DefmarketUser getUserById(Long id);


}
