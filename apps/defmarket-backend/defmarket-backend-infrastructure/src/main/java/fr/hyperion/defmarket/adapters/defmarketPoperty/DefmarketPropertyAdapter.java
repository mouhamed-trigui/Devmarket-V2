package fr.hyperion.defmarket.adapters.defmarketPoperty;

import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.ports.user.gateway.DefmarketPropertyGateway;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DefmarketPropertyAdapter implements DefmarketPropertyGateway {

    private final DefmarketProperty defmarketProperty;

    @Override
    public String getFrontEndLink() {
        return defmarketProperty.getFrontEndLink();
    }

    @Override
    public String getFrontEndAccess() {
        return defmarketProperty.getFrontAccess();
    }

    @Override
    public String hostname() {
        return defmarketProperty.getHostname();
    }

    @Override
    public long getSecurityJwtAccessTokenValidity() {
        return defmarketProperty.getSecurity().getJwt().getAccessTokenValidity();
    }

    @Override
    public long getSecurityJwtRefreshTokenValidity() {
        return defmarketProperty.getSecurity().getJwt().getRefreshTokenValidity();
    }
}
