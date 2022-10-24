package fr.hyperion.defmarket.dto.response.announcement;

import java.time.Instant;

import fr.hyperion.defmarket.dto.response.DocumentResponse;

public class AnnouncementResponse {
    public Long id;
    public String title;
    public String description;
    public Instant createdDate;
    public boolean visible;
    public DocumentResponse image;
    public Instant lastModifiedDate;
}
