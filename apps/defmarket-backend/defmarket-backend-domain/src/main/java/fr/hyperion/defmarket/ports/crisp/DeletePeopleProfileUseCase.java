package fr.hyperion.defmarket.ports.crisp;

import fr.hyperion.defmarket.data.crisp.CrispResponse;

public interface DeletePeopleProfileUseCase {
    CrispResponse deletePeopleProfile(String crispId);
}
