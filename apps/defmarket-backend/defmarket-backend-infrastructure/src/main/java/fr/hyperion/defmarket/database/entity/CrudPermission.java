package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
public class CrudPermission {
    @Column(name = "canRead")
    private boolean read;
    @Column(name = "canWrite")
    private boolean create;
    @Column(name = "canUpdate")
    private boolean update;
    @Column(name = "canDelete")
    private boolean delete;

    @Column(name = "isAdmin")
    private boolean admin;
}
