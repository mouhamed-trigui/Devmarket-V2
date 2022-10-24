package fr.hyperion.defmarket.ports.redirection.useCase;

import fr.hyperion.defmarket.enumerated.JwtEnum;

public interface AddNewRedirectionMapperUserCase {
    String addNewRedirectionMapper(final Long UserId, final JwtEnum action);
}
