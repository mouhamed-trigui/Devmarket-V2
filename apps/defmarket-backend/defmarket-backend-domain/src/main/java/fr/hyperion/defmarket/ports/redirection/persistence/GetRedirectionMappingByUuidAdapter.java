package fr.hyperion.defmarket.ports.redirection.persistence;

import fr.hyperion.defmarket.data.redirection.RedirectMapping;

public interface GetRedirectionMappingByUuidAdapter {
    RedirectMapping getRedirectionMappingByUuid(String key);
}
