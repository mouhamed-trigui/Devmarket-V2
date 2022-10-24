package fr.hyperion.defmarket.dto.request.announcement;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;

public class AnnouncementCreationRequest {
    @NotNull
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String title;

    public String description;

    public boolean visible;
}
