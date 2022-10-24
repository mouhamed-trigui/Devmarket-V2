package fr.hyperion.defmarket.ports.crisp;

import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.user.UserAccount;

public interface AddNewCrispProfileIfNotExistUseCase {
    CrispResponse addNewCrispProfileIfNotExist(UserAccount user);

    void addNewCrispProfile(UserAccount user);
}
