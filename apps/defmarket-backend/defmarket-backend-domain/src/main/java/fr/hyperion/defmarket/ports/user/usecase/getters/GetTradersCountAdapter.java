package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetTradersCountAdapter {
    Long getTradersCount(UserFilter userFilter, UserTypeEnum userType);
}
