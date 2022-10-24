package fr.hyperion.defmarket.adapters.roles.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import fr.hyperion.defmarket.data.roles.CrudPermission;
import fr.hyperion.defmarket.data.roles.DefaultRole;
import fr.hyperion.defmarket.data.roles.Role;
import fr.hyperion.defmarket.database.entity.DefaultRoleDB;
import fr.hyperion.defmarket.database.entity.DefaultRolePermissionsDB;
import fr.hyperion.defmarket.database.entity.UserRoleDB;
import fr.hyperion.defmarket.database.entity.UserRolesPermissionDB;

@Mapper(uses = PermissionDBMapper.class)
public interface RoleDBMapper {
    @Mapping(target = "permissions", source = "userRolePermissions", qualifiedByName = "toCrudPermission")
    Role toRole(UserRoleDB userRoles);

    List<Role> toRole(List<UserRoleDB> userRoles);

    @Named("toCrudPermission")
    default List<CrudPermission> toCrudPermission(final List<UserRolesPermissionDB> userRolePermissions) {
        return userRolePermissions.stream().map(userRolesPermissionDB -> {
            final CrudPermission crudPermission = new CrudPermission();
            crudPermission.setId(userRolesPermissionDB.getPermission().getId());
            crudPermission.setName(userRolesPermissionDB.getPermission().getName());
            crudPermission.setDescription(userRolesPermissionDB.getPermission().getDescription());

            crudPermission.setAdmin(userRolesPermissionDB.getCrudPermission().isAdmin());

            crudPermission.setCreate(userRolesPermissionDB.getCrudPermission().isCreate());
            crudPermission.setRead(userRolesPermissionDB.getCrudPermission().isRead());
            crudPermission.setUpdate(userRolesPermissionDB.getCrudPermission().isUpdate());
            crudPermission.setDelete(userRolesPermissionDB.getCrudPermission().isDelete());
            return crudPermission;
        }).toList();
    }


    @Mapping(target = "userRolePermissions", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    UserRoleDB toDB(Role role);

    List<UserRoleDB> toDB(List<Role> roles);


    @Mapping(target = "permissions", source = "defaultRolePermissions", qualifiedByName = "toPermission")
    DefaultRole toDefaultRole(DefaultRoleDB defaultRoleDB);

    List<DefaultRole> toDefaultRole(List<DefaultRoleDB> defaultRoleDB);

    @Named("toPermission")
    default CrudPermission toPermission(final DefaultRolePermissionsDB defaultRolePermissionsDB) {
        final CrudPermission crudPermission = new CrudPermission();
        crudPermission.setId(defaultRolePermissionsDB.getPermission().getId());
        crudPermission.setName(defaultRolePermissionsDB.getPermission().getName());
        crudPermission.setDescription(defaultRolePermissionsDB.getPermission().getDescription());

        crudPermission.setAdmin(defaultRolePermissionsDB.getCrudPermission().isAdmin());

        crudPermission.setCreate(defaultRolePermissionsDB.getCrudPermission().isCreate());
        crudPermission.setRead(defaultRolePermissionsDB.getCrudPermission().isRead());
        crudPermission.setUpdate(defaultRolePermissionsDB.getCrudPermission().isUpdate());
        crudPermission.setDelete(defaultRolePermissionsDB.getCrudPermission().isDelete());
        return crudPermission;
    }
}
