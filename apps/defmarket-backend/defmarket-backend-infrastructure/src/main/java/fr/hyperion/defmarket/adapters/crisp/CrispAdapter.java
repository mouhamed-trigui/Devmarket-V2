package fr.hyperion.defmarket.adapters.crisp;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import fr.hyperion.defmarket.data.crisp.CrispRequest;
import fr.hyperion.defmarket.data.crisp.CrispResponse;
import fr.hyperion.defmarket.data.crisp.CrispUpdateRequest;
import fr.hyperion.defmarket.data.user.UserAccount;
import fr.hyperion.defmarket.ports.crisp.AddNewCrispProfileIfNotExistUseCase;
import fr.hyperion.defmarket.ports.crisp.AddNewPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.DeletePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.GetCrispPeopleProfileUseCase;
import fr.hyperion.defmarket.ports.crisp.UpdatePeopleProfileUseCase;
import fr.hyperion.defmarket.ports.user.persistence.UpdateUserAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@RequiredArgsConstructor
@Profile({"rct || prod"})
public class CrispAdapter implements AddNewPeopleProfileUseCase, AddNewCrispProfileIfNotExistUseCase,
    UpdatePeopleProfileUseCase, DeletePeopleProfileUseCase, GetCrispPeopleProfileUseCase {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BASIC = "Basic ";
    private static final String X_CRISP_TIER = "X-Crisp-Tier";
    private static final String PLUGIN = "plugin";
    private static final String PEOPLE_PROFILE_ENDPOINT = "/people/profile";
    private final DefmarketProperty defmarketProperty;
    private static WebClient webClient;
    private final UpdateUserAdapter updateUserAdapter;

    @PostConstruct
    public void init() {
        webClient = WebClient
            .builder().baseUrl(defmarketProperty.getCrisp().getApiUrl()
                + defmarketProperty.getCrisp().getPro().getWebsiteId() + PEOPLE_PROFILE_ENDPOINT)
            .defaultHeaders(h -> {
                h.add(AUTHORIZATION, BASIC + defmarketProperty.getCrisp().getPro().getAuthToken());
                h.add(X_CRISP_TIER, PLUGIN);
            }).build();
        log.info("CrispAdapter activated on rct or prod profile");
    }

    @Override
    public CrispResponse getCrispPeopleProfile(final String userEmail) {
        var crispResponse = new CrispResponse();
        try {
            crispResponse = webClient.get()
                .uri("/{email}", userEmail)
                .retrieve()
                .bodyToMono(CrispResponse.class)
                .doOnSuccess(response -> log.info("Got the existing Crisp id Successfully !!!"))
                .block();
        } catch (final WebClientResponseException e) {
            crispResponse.setError(true);
            crispResponse.setReason(e.getMessage());
            log.error("Failed to get the existing Crisp id", e);
        }
        return crispResponse;
    }

    @Override
    public CrispResponse addNewPeopleProfile(final String userEmail, final String nickname) {
        var crispResponse = new CrispResponse();
        try {
            crispResponse = webClient.post()
                .bodyValue(
                    new CrispRequest(
                        userEmail,
                        nickname))
                .retrieve()
                .bodyToMono(CrispResponse.class)
                .doOnSuccess(response -> log.info("Created Crisp people profile Successfully !!!"))
                .block();
        } catch (final WebClientResponseException e) {
            if (e.getRawStatusCode() == 409) {
                log.info("Trying to get the existing crisp id");
                crispResponse = getCrispPeopleProfile(userEmail);

            } else {
                crispResponse.setError(true);
                crispResponse.setReason(e.getMessage());
                log.error("Error while adding new people profile in Crisp", e);
            }
        }
        return crispResponse;
    }

    @Override
    public void addNewCrispProfile(final UserAccount user) {
        if (user.getCrispId() == null) {
            final CrispResponse crispResponse = addNewPeopleProfile(user.getEmail(),
                StringUtils.isBlank(user.getFirstName()) ? user.getEmail() : user.getFirstName());
            if (!crispResponse.isError()) {
                user.setCrispId(crispResponse.getData().get("people_id").toString());
                updateUserAdapter.update(user);
            }
        }
    }

    @Override
    public CrispResponse addNewCrispProfileIfNotExist(final UserAccount user) {
        if (user.getCrispId() == null) {
            final CrispResponse crispResponse = addNewPeopleProfile(user.getEmail(),
                StringUtils.isBlank(user.getFirstName()) ? user.getEmail() : user.getFirstName());
            if (!crispResponse.isError()) {
                user.setCrispId(crispResponse.getData().get("people_id").toString());
            }
            return crispResponse;
        }
        return null;
    }

    @Override
    public CrispResponse updatePeopleProfile(final UserAccount user) {
        if (user.getCrispId() == null) {
            return addNewCrispProfileIfNotExist(user);
        }
        var crispResponse = new CrispResponse();
        try {
            String city = "";
            if (user.getAddress() != null) {
                city = user.getAddress().getCity();
            }
            String phone = "";
            if (user.getPhone() != null) {
                phone = user.getPhone().toString();
            }
            crispResponse = webClient.patch()
                .uri("/{peopleId}", user.getCrispId())
                .bodyValue(
                    new CrispUpdateRequest(
                        user.getEmail(),
                        user.getFirstName(), user.getGender(), city, phone))
                .retrieve()
                .bodyToMono(CrispResponse.class)
                .doOnSuccess(response -> log.info("Updated Crisp people profile Successfully !!!"))
                .block();
        } catch (final WebClientResponseException e) {
            crispResponse.setError(true);
            crispResponse.setReason(e.getMessage());
            log.error("Error while updating people profile in Crisp", e);
        }
        return crispResponse;
    }

    @Override
    public CrispResponse deletePeopleProfile(final String crispId) {
        var crispResponse = new CrispResponse();
        try {
            crispResponse = webClient.delete()
                .uri("/{peopleId}", crispId)
                .retrieve()
                .bodyToMono(CrispResponse.class)
                .doOnSuccess(response -> log.info("Deleted Crisp people profile Successfully !!!"))
                .block();
        } catch (final WebClientResponseException e) {
            crispResponse.setError(true);
            crispResponse.setReason(e.getMessage());
            log.error("Error while deleting people profile in Crisp", e);
        }
        return crispResponse;
    }
}
