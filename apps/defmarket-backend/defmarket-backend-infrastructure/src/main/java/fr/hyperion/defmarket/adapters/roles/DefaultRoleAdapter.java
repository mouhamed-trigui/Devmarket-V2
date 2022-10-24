package fr.hyperion.defmarket.adapters.roles;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.roles.mapper.RoleDBMapper;
import fr.hyperion.defmarket.data.roles.DefaultRole;
import fr.hyperion.defmarket.database.entity.DefaultRoleDB;
import fr.hyperion.defmarket.database.repository.DefaultRoleRepository;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.role.persistence.GetDefaultRolesByTargetAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DefaultRoleAdapter implements GetDefaultRolesByTargetAdapter {

    private final DefaultRoleRepository defaultRoleRepository;

    private final RoleDBMapper roleDBMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DefaultRole> getDefaultRoleByTarget(final UserTypeEnum target) {
        final List<DefaultRoleDB> defaultRoles = defaultRoleRepository.findByTarget(target);
        return roleDBMapper.toDefaultRole(defaultRoles);
    }
}
