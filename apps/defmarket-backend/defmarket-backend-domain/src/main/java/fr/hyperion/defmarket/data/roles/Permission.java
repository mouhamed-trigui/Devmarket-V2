package fr.hyperion.defmarket.data.roles;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Permission {
    private Long id;
    private String name;
    private String description;
}
