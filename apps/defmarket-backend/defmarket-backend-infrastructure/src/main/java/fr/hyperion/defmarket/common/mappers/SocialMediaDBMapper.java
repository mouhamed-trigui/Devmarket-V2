package fr.hyperion.defmarket.common.mappers;


import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.internet.SocialMedia;
import fr.hyperion.defmarket.database.entity.SocialMediaDB;
import fr.hyperion.defmarket.database.entity.StoreDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class SocialMediaDBMapper {

    abstract SocialMedia toData(SocialMediaDB socialMediaDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    abstract SocialMediaDB toEntity(SocialMedia socialMedia);


    @Mapping(target = "version", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    abstract SocialMediaDB update(SocialMedia socialMedia, @MappingTarget SocialMediaDB socialMediaDB);


    public void update(final List<SocialMedia> socialMedia, final StoreDB storeDB) {
        if (socialMedia == null) {
            return;
        }

        socialMedia.forEach(sm -> {
            if (sm.getId() == null) {
                final SocialMediaDB socialMediaDB = toEntity(sm);
                socialMediaDB.setStore(storeDB);
                storeDB.getSocialMedia().add(socialMediaDB);
            } else {
                storeDB.getSocialMedia().stream().filter(s -> s.getId().equals(sm.getId())).findFirst().ifPresent(smDB -> update(sm, smDB));
            }
        });
    }
}
