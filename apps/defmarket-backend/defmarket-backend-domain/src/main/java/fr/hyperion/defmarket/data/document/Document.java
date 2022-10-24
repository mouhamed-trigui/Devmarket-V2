package fr.hyperion.defmarket.data.document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Document {
    private Long id;
    private String name;
    private String path;
    private Long size;
}
