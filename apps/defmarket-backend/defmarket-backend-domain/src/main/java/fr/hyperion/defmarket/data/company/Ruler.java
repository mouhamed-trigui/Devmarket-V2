package fr.hyperion.defmarket.data.company;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Ruler {
    private Long id;
    private String name;
    private String lastName;
    private boolean deleted;
}
