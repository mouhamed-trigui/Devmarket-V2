package fr.hyperion.defmarket.service.redirection;

import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.auth0.jwt.exceptions.TokenExpiredException;

import fr.hyperion.defmarket.data.redirection.RedirectMapping;
import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.ports.redirection.persistence.AddNewRedirectionMapperAdapter;
import fr.hyperion.defmarket.ports.redirection.persistence.GetRedirectionMappingByUuidAdapter;
import fr.hyperion.defmarket.ports.redirection.useCase.AddNewRedirectionMapperUserCase;
import fr.hyperion.defmarket.ports.redirection.useCase.GetLinkUseCase;
import fr.hyperion.defmarket.ports.user.gateway.DefmarketPropertyGateway;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByIdUseCase;
import fr.hyperion.defmarket.service.exceptions.RedirectionException;
import fr.hyperion.defmarket.service.user.JwtHelper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Service
@RequiredArgsConstructor
public class RedirectionServiceImpl implements GetLinkUseCase, AddNewRedirectionMapperUserCase {
    private final GetRedirectionMappingByUuidAdapter getRedirectionMappingByUuidAdapter;
    private final AddNewRedirectionMapperAdapter addNewRedirectionMapperAdapter;

    private final GetUserByIdUseCase getUserByIdUseCase;
    private final JwtHelper jwtHelper;
    private final DefmarketPropertyGateway defmarketPropertyGateway;

    @Override
    public String getLink(final String key, final String userAgent) {
        final RedirectMapping redirectMapping;
        try {
            redirectMapping = getRedirectionMappingByUuidAdapter.getRedirectionMappingByUuid(key);

        } catch (final Exception e) {
            throw new RedirectionException("le lien est expiré");
        }
        final String token = redirectMapping.getToken();
        if (jwtHelper.isTokenExpired(token)) {
            throw new TokenExpiredException("Link expired");
        }
        final String baseUrl = defmarketPropertyGateway.getFrontEndLink();

        switch (redirectMapping.getAction()) {
            case JWT_CHANGE_EMAIL -> {
                log.info("Redirection to change email");
                return baseUrl + "changeEmail?token=" + token;
            }
            case JWT_FORGOT_PASSWORD -> {
                log.info("Redirection to forget password");
                return baseUrl + "changePassword?token=" + token;
            }
            case JWT_CHANGE_PASSWORD -> {

                log.info("Redirection to change password");
                return baseUrl + "changePassword?token=" + token;
            }
            case JWT_VALIDATE_EMAIL -> {
                log.info("Redirection to valid email");
                return baseUrl + "ActivationMail?token=" + token;
            }
            default -> throw new IllegalArgumentException("Unknown action: " + redirectMapping.getAction());
        }
    }

    private boolean isMobile(final String userAgent) {
        return userAgent.contains("Android") || userAgent.contains("iPhone") || userAgent.contains("iPad")
            || userAgent.contains("iPod") || userAgent.contains("BlackBerry") || userAgent.contains("Windows Phone");
    }

    @Override
    public String addNewRedirectionMapper(final Long userId, final JwtEnum action) {
        final DefmarketUser user = getUserByIdUseCase.getUserById(userId);
        final String uuid = UUID.randomUUID().toString();
        final Map<String, String> claims = new HashMap<>();
        claims.put("id", userId.toString());
        claims.put("key", uuid);
        claims.put("roles", action.toString());
        String token = jwtHelper.createJwtWithClaims(user.getEmail(), claims,
            20, ChronoUnit.MINUTES);
        if (action == JwtEnum.JWT_VALIDATE_EMAIL) {
            token = jwtHelper.createJwtWithClaims(user.getEmail(), claims,
                10, ChronoUnit.DAYS);
        }
        final RedirectMapping redirectMapping = addNewRedirectionMapperAdapter.addNewRedirectionMapper(userId, uuid,
            action, token);
        return defmarketPropertyGateway.hostname() + "/redirection/" + redirectMapping.getUuid();
    }
}
