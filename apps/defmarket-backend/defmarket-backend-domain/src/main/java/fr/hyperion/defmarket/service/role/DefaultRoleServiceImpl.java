package fr.hyperion.defmarket.service.role;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.roles.DefaultRole;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.ports.role.persistence.GetDefaultRolesByTargetAdapter;
import fr.hyperion.defmarket.ports.role.usecase.getters.GetDefaultRolesByTargetUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DefaultRoleServiceImpl implements GetDefaultRolesByTargetUseCase {
    private final GetDefaultRolesByTargetAdapter getDefaultRolesByTargetAdapter;

    @Override
    public List<DefaultRole> getDefaultRoleByTarget(final UserTypeEnum target) {
        return getDefaultRolesByTargetAdapter.getDefaultRoleByTarget(target);
    }
}
