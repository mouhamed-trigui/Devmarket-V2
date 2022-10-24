package fr.hyperion.defmarket.data.announcement;

import java.time.Instant;

import fr.hyperion.defmarket.data.document.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Announcement {

    private Long id;

    private Document image;

    private String title;

    private String description;

    private Instant createdDate;

    private Instant lastModifiedDate;

    private boolean visible;

    private boolean deleted;


}
