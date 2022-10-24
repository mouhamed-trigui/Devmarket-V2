package fr.hyperion.defmarket.ports.user.gateway;

public interface DefmarketPropertyGateway {
    String getFrontEndLink();

    String getFrontEndAccess();

    String hostname();

    long getSecurityJwtAccessTokenValidity();

    long getSecurityJwtRefreshTokenValidity();
}
