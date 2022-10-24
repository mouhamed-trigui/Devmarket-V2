package fr.hyperion.defmarket.ports.role.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.roles.DefaultRole;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface GetDefaultRolesByTargetAdapter {
    List<DefaultRole> getDefaultRoleByTarget(UserTypeEnum target);
}
