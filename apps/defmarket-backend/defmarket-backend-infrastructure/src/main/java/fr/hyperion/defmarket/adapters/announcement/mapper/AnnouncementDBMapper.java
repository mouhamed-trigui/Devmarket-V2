package fr.hyperion.defmarket.adapters.announcement.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.database.entity.AnnouncementDB;

@Mapper(uses = DocumentDBMapper.class)
public interface AnnouncementDBMapper {
    @Mapping(target = "createdDate", source = "createdDate")
    @Mapping(target = "lastModifiedDate", source = "lastModifiedDate")
    Announcement toData(AnnouncementDB announcementDB);

    List<Announcement> toData(List<AnnouncementDB> announcementDBS);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "title", source = "announcement.title")
    @Mapping(target = "description", source = "announcement.description")
    @Mapping(target = "visible", source = "announcement.visible")
    @Mapping(target = "deleted", source = "announcement.deleted")
    AnnouncementDB toEntity(Announcement announcement);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "title", source = "announcement.title")
    @Mapping(target = "description", source = "announcement.description")
    @Mapping(target = "visible", source = "announcement.visible")
    AnnouncementDB toEntity(Announcement announcement, @MappingTarget AnnouncementDB announcementDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "title", source = "announcement.title")
    @Mapping(target = "description", source = "announcement.description")
    @Mapping(target = "visible", source = "announcement.visible")
    @Mapping(target = "deleted", source = "announcement.deleted")
    AnnouncementDB toUpdate(Announcement announcement, @MappingTarget AnnouncementDB announcementDB);
}
