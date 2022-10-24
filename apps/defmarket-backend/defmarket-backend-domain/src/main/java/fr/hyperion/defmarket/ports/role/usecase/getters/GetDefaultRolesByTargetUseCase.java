package fr.hyperion.defmarket.ports.role.usecase.getters;

import java.util.List;

import fr.hyperion.defmarket.data.roles.DefaultRole;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetDefaultRolesByTargetUseCase {
    List<DefaultRole> getDefaultRoleByTarget(UserTypeEnum target);
}
