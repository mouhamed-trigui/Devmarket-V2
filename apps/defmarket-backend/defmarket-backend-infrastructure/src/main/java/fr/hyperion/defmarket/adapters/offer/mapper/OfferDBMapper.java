package fr.hyperion.defmarket.adapters.offer.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.adapters.store.mapper.StoreDBMapper;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.OfferModeration;
import fr.hyperion.defmarket.database.entity.StoreDB;

@Mapper(uses = {DocumentDBMapper.class, StoreDBMapper.class})
public interface OfferDBMapper {

    Offer toData(OfferDB offerDB);

    List<Offer> toData(List<OfferDB> offerDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "store", source = "storeDB")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "title", source = "offer.title")
    @Mapping(target = "deleted", source = "offer.deleted")
    @Mapping(target = "description", source = "offer.description")
    @Mapping(target = "validatedByAdmin", source = "offer.validatedByAdmin")
    @Mapping(target = "blocked", source = "offer.blocked")
    @Mapping(target = "moderation", ignore = true)
    @Mapping(target = "photo", ignore = true)
    @Mapping(target = "attachedFile", ignore = true)
    OfferDB toEntity(Offer offer, StoreDB storeDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "store", source = "storeDB")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "title", source = "offer.title")
    @Mapping(target = "photo", ignore = true)
    @Mapping(target = "attachedFile", ignore = true)
    @Mapping(target = "description", source = "offer.description")
    @Mapping(target = "deleted", source = "offer.deleted")
    @Mapping(target = "validatedByAdmin", source = "offer.validatedByAdmin")
    @Mapping(target = "blocked", source = "offer.blocked")
    @Mapping(target = "moderation", ignore = true)
    OfferDB toEntity(Offer offer, StoreDB storeDB, @MappingTarget OfferDB offerDB);

    @Mapping(target = "storeId", source = "store.id")
    OfferModeration toOfferModeration(OfferDB offerDB);
}
