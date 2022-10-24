package fr.hyperion.defmarket.controller.pro.announcement.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementCreationRequest;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementUpdateRequest;
import fr.hyperion.defmarket.dto.response.announcement.AnnouncementResponse;

@Mapper(uses = DocumentMapper.class)
public interface AnnouncementMapper {
    AnnouncementResponse toResponse(Announcement announcement);

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Announcement toEntity(AnnouncementCreationRequest announcementCreationRequest, Document image);

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Announcement toUpdate(AnnouncementUpdateRequest announcementUpdateRequest);

    List<AnnouncementResponse> toResponse(List<Announcement> allAnnouncement);
}
