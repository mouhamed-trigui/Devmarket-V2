package fr.hyperion.defmarket.ports.user.persistence;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetUserByEmailAdapter {
    DefmarketUser getUserByEmail(String email, UserTypeEnum userType);
}
