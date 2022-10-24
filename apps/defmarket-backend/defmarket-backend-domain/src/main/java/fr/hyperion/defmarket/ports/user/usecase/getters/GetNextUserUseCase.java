package fr.hyperion.defmarket.ports.user.usecase.getters;

import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetNextUserUseCase {
    OperatorWithCompanies getNextUser(Long currentUserId, UserFilter filter, boolean desc, UserTypeEnum userType);
}
