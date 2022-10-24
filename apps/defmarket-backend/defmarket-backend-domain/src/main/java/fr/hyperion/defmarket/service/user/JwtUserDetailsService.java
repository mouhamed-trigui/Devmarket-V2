package fr.hyperion.defmarket.service.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.user.DefmarketUser;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.user.gateway.DefmarketPropertyGateway;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetUserByEmailUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {
    private final GetUserByEmailUseCase getUserByEmailUseCase;
    private final JwtHelper jwtHelper;
    private final DefmarketPropertyGateway defmarketPropertyGateway;

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        return getUserByEmailUseCase.getUserByEmail(username, UserTypeEnum.TRADER);
    }

    public String getRefreshToken(final DefmarketUser userDetails) {
        final Map<String, String> claims = new HashMap<>();
        claims.put("id", userDetails.getId().toString());
        claims.put("roles", JwtEnum.JWT_REFRESH_TOKEN.toString());

        return jwtHelper.createJwtWithClaims(userDetails.getEmail(), claims, defmarketPropertyGateway.getSecurityJwtRefreshTokenValidity());
    }

    public String getAccessToken(final DefmarketUser userDetails) {
        final Map<String, String> claims = new HashMap<>();
        claims.put("id", userDetails.getId().toString());
        String authorities = userDetails.getAuthoritiesAsString();
        if (authorities.isBlank()) {
            authorities = JwtEnum.JWT_ACCESS_TOKEN.toString();
        } else {
            authorities += " " + JwtEnum.JWT_ACCESS_TOKEN;
        }

        claims.put("roles", authorities);
        return jwtHelper.createJwtWithClaims(userDetails.getEmail(), claims, defmarketPropertyGateway.getSecurityJwtAccessTokenValidity());
    }
}
