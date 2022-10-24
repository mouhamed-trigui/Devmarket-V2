package fr.hyperion.defmarket.ports.redirection.persistence;

import fr.hyperion.defmarket.data.redirection.RedirectMapping;
import fr.hyperion.defmarket.enumerated.JwtEnum;

public interface AddNewRedirectionMapperAdapter {
    RedirectMapping addNewRedirectionMapper(Long UserId, String uuid, JwtEnum action, String token);
}
