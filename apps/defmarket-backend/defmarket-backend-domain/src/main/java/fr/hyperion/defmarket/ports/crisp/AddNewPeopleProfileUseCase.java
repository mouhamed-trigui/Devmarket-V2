package fr.hyperion.defmarket.ports.crisp;

import fr.hyperion.defmarket.data.crisp.CrispResponse;

public interface AddNewPeopleProfileUseCase {
    CrispResponse addNewPeopleProfile(String userEmail, String nickname);
}
