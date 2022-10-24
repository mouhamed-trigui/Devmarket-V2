package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetUserByEmailUseCase {
    DefmarketUser getUserByEmail(String email, UserTypeEnum userType);

    DefmarketUser getUserByEmail(String email);
}
