package fr.hyperion.defmarket.ports.user.usecase;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.data.user.Operator;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface AddUserByAdminUseCase {
    Operator addUserByAdmin(Operator user, Long jobId);

    DefmarketUser addUserByAdmin(DefmarketUser user, UserTypeEnum userType);

}
