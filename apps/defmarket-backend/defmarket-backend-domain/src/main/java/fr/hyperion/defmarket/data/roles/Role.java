package fr.hyperion.defmarket.data.roles;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Role {
    private Long id;
    private String name;
    private String description;

    private List<CrudPermission> permissions;
}
