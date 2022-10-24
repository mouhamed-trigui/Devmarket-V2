package fr.hyperion.defmarket.database.entity;


import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Audited
@NoArgsConstructor
@Entity
@Table(name = "default_role_permissions", schema = "defmarket")
public class DefaultRolePermissionsDB {

    @EmbeddedId
    private RolePermissionsDBKey id;

    @ManyToOne
    @MapsId("permissionId")
    private PermissionDB permission;

    @Embedded
    private CrudPermission crudPermission;

    @ManyToOne
    @MapsId("roleId")
    private DefaultRoleDB role;

}
