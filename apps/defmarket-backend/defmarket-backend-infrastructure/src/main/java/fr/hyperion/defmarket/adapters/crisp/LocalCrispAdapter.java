package fr.hyperion.defmarket.adapters.crisp;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.ports.crisp.AddNewCrispProfileIfNotExistUseCase;
import fr.hyperion.defmarket.ports.crisp.AddNewPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.DeletePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.GetCrispPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.UpdatePeopleProfileUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@RequiredArgsConstructor
@Profile({"local", "test"})
public class LocalCrispAdapter implements AddNewPeopleProfileUseCase, AddNewCrispProfileIfNotExistUseCase,
    UpdatePeopleProfileUseCase, DeletePeopleProfileUseCase, GetCrispPeopleProfileUseCase {
    private static final String NOT_IMPLEMENTED = "Not implemented";

    @Override
    public CrispResponse getCrispPeopleProfile(final String userEmail) {
        log.info("LocalCrispAdapter is on, people profile will not be added in Crisp");
        final CrispResponse crispResponse = new CrispResponse();
        crispResponse.setError(true);
        crispResponse.setReason(NOT_IMPLEMENTED);
        return crispResponse;
    }

    @Override
    public CrispResponse addNewPeopleProfile(final String userEmail, final String nickname) {
        log.info("LocalCrispAdapter is on, people profile will not be added in Crisp");
        final CrispResponse crispResponse = new CrispResponse();
        crispResponse.setError(true);
        crispResponse.setReason(NOT_IMPLEMENTED);
        return crispResponse;
    }

    @Override
    public void addNewCrispProfile(final UserAccount user) {
        addNewCrispProfileIfNotExist(user);
    }

    @Override
    public CrispResponse addNewCrispProfileIfNotExist(final UserAccount user) {
        return addNewPeopleProfile(user.getEmail(), user.getFirstName());
    }

    @Override
    public CrispResponse updatePeopleProfile(final UserAccount user) {
        log.info("LocalCrispAdapter is on, people profile will not be updated in Crisp");
        final CrispResponse crispResponse = new CrispResponse();
        crispResponse.setError(true);
        crispResponse.setReason(NOT_IMPLEMENTED);
        return crispResponse;
    }

    @Override
    public CrispResponse deletePeopleProfile(final String crispId) {
        log.info("LocalCrispAdapter is on, people profile will not be deleted in Crisp");
        final CrispResponse crispResponse = new CrispResponse();
        crispResponse.setError(true);
        crispResponse.setReason(NOT_IMPLEMENTED);
        return crispResponse;
    }
}
