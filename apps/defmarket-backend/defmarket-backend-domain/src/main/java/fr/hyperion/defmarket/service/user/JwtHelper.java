package fr.hyperion.defmarket.service.user;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JwtHelper {

    private final RSAPrivateKey privateKey;
    private final RSAPublicKey publicKey;
    private final DateAndTimeUseCase dateAndTimeUseCase;

    public String createJwtWithClaims(final String subject, final Map<String, String> claims, final long nbrOfDaysUntilExpiration) {
        return createJwtWithClaims(subject, claims, nbrOfDaysUntilExpiration, ChronoUnit.DAYS);
    }

    public String createJwtWithClaims(final String subject, final Map<String, String> claims, final long amountOfTemporalUnitUntilExpiration, final TemporalUnit unit) {
        final Instant expiration = dateAndTimeUseCase.nowUTC().plus(amountOfTemporalUnitUntilExpiration, unit);

        final JWTCreator.Builder jwtBuilder = JWT.create().withSubject(subject);

        // Add claims
        claims.forEach(jwtBuilder::withClaim);

        // Add expiredAt and etc
        return jwtBuilder
            .withNotBefore(new Date())
            .withExpiresAt(Date.from(expiration))
            .sign(Algorithm.RSA256(publicKey, privateKey));
    }

    public boolean isTokenExpired(final String token) {
        final Algorithm algorithm = Algorithm.RSA256(publicKey, privateKey);
        final JWTVerifier verifier = JWT.require(algorithm)
            .build();
        final DecodedJWT jwt = verifier.verify(token);
        return dateAndTimeUseCase.nowUTC().isAfter(jwt.getExpiresAt().toInstant());

    }
}
