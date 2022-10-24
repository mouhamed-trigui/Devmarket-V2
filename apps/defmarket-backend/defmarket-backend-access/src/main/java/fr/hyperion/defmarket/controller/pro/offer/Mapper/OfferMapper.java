package fr.hyperion.defmarket.controller.pro.offer.Mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.dto.request.offer.OfferCreationRequest;
import fr.hyperion.defmarket.dto.request.offer.OfferUpdateRequest;
import fr.hyperion.defmarket.dto.response.offer.AdminOfferResponse;


@Mapper(uses = DocumentMapper.class)
public interface OfferMapper {

    AdminOfferResponse toResponse(Offer offer);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "photo", source = "photo")
    @Mapping(target = "attachedFile", source = "attached")
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    Offer toEntity(OfferCreationRequest offerCreationRequest, Document photo, Document attached);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "photo", ignore = true)
    @Mapping(target = "attachedFile", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    Offer toUpdate(OfferUpdateRequest offerUpdateRequest, @MappingTarget Offer offer);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "photo", ignore = true)
    @Mapping(target = "attachedFile", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    Offer toEntity(OfferUpdateRequest offerUpdateRequest, @MappingTarget Offer offer);

    List<AdminOfferResponse> toResponse(List<Offer> allStoreOffers);
}
