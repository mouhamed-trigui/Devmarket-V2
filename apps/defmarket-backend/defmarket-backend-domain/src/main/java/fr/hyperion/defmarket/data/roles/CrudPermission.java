package fr.hyperion.defmarket.data.roles;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class CrudPermission extends Permission {

    private boolean create;
    private boolean read;
    private boolean update;
    private boolean delete;

    private boolean admin;
}
