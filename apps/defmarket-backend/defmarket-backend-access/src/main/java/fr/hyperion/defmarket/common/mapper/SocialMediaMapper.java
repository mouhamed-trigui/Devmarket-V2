package fr.hyperion.defmarket.common.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.internet.SocialMedia;
import fr.hyperion.defmarket.dto.response.user.contact.SocialMediaResponse;

@Mapper
public interface SocialMediaMapper {

    SocialMediaResponse toResponse(SocialMedia socialMedia);

    List<SocialMediaResponse> toResponse(List<SocialMedia> socialMedia);
}
