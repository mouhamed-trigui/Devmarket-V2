package fr.hyperion.defmarket.ports.crisp;

import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.user.UserAccount;

public interface UpdatePeopleProfileUseCase {
    CrispResponse updatePeopleProfile(UserAccount user);
}
