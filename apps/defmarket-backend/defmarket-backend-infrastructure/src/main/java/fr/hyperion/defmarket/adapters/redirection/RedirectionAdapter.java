package fr.hyperion.defmarket.adapters.redirection;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.redirection.mapper.RedirectionMappingDBMapper;
import fr.hyperion.defmarket.data.redirection.RedirectMapping;
import fr.hyperion.defmarket.database.entity.RedirectMappingDB;
import fr.hyperion.defmarket.database.repository.RedirectMappingDBRepository;
import fr.hyperion.defmarket.database.specification.RedirectionSpecification;
import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.ports.redirection.persistence.AddNewRedirectionMapperAdapter;
import fr.hyperion.defmarket.ports.redirection.persistence.DeleteRedirectionAdapter;
import fr.hyperion.defmarket.ports.redirection.persistence.GetRedirectionMappingByUuidAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedirectionAdapter implements GetRedirectionMappingByUuidAdapter, AddNewRedirectionMapperAdapter,
    DeleteRedirectionAdapter {
    private final RedirectMappingDBRepository redirectMappingDBRepository;
    private final RedirectionMappingDBMapper redirectionMappingDBMapper;

    @Override
    @Transactional
    public RedirectMapping getRedirectionMappingByUuid(final String key) {
        final Specification<RedirectMappingDB> specifications =
            Specification.where(RedirectionSpecification.byUuid(key));
        final RedirectMappingDB redirectMappingDB = redirectMappingDBRepository.findOne(specifications).orElseThrow();
        return redirectionMappingDBMapper.toData(redirectMappingDB);
    }

    @Override
    @Transactional
    public RedirectMapping addNewRedirectionMapper(final Long UserId, final String uuid, final JwtEnum action,
                                                   final String token) {
        RedirectMappingDB redirectMappingDB = new RedirectMappingDB();
        redirectMappingDB.setUuid(uuid);
        redirectMappingDB.setUserId(UserId);
        redirectMappingDB.setAction(action);
        redirectMappingDB.setToken(token);
        redirectMappingDB = redirectMappingDBRepository.save(redirectMappingDB);
        return redirectionMappingDBMapper.toData(redirectMappingDB);
    }

    @Override
    @Transactional
    public void deleteRedirectionMapper(final String id) {
        redirectMappingDBRepository.deleteById(id);
    }
}
