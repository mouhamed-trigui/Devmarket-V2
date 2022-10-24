package fr.hyperion.defmarket.adapters.roles.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.roles.Permission;
import fr.hyperion.defmarket.database.entity.PermissionDB;

@Mapper
public interface PermissionDBMapper {

    Permission toPermission(PermissionDB permission);

    List<Permission> toPermission(List<PermissionDB> permission);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    PermissionDB toPermissionDB(Permission permission);

}
