package fr.hyperion.defmarket.database.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RolePermissionsDBKey implements Serializable {
    private Long roleId;

    private Long permissionId;
}
