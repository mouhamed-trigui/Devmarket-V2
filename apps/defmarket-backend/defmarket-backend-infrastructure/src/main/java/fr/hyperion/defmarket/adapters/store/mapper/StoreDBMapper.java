package fr.hyperion.defmarket.adapters.store.mapper;

import java.util.List;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import fr.hyperion.defmarket.adapters.company.mapper.CompanyDBMapper;
import fr.hyperion.defmarket.adapters.storeCategory.mapper.StoreCategoryDBMapper;
import fr.hyperion.defmarket.common.mappers.AddressDBMapper;
import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.common.mappers.GeolocationDBMapper;
import fr.hyperion.defmarket.common.mappers.PhoneDBMapper;
import fr.hyperion.defmarket.common.mappers.SocialMediaDBMapper;
import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.PracticedOfferBeforeDMDB;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.StoreModeration;

@Mapper(uses = {DocumentDBMapper.class, CompanyDBMapper.class, AddressDBMapper.class, GeolocationDBMapper.class,
    SocialMediaDBMapper.class, PhoneDBMapper.class, StoreCategoryDBMapper.class})
public interface StoreDBMapper {

    @Mapping(target = "category", source = "storeCategory")
    @Mapping(target = "offerNbr", ignore = true)
    @Mapping(target = "company", source = "company", qualifiedByName = "getCompanyWithStoresNbrAndOwner")
    @Named(value = "useToData")
    Store toData(StoreDB storeDB);

    @IterableMapping(qualifiedByName = "useToData")
    List<Store> toData(List<StoreDB> storeDB);

    @Mapping(target = "category", source = "storeCategory")
    @Mapping(target = "offerNbr", ignore = true)
    @Mapping(target = "company", source = "company", qualifiedByName = "getCompanyWithStoresNbrAndOwner")
    StoreWithTimeTable mapToStoreWithTimeTable(StoreDB storeDB);

    @Mapping(target = "timetableList", ignore = true)
    @Mapping(target = "offerList", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "socialMedia", ignore = true)
    @Mapping(target = "phoneList", ignore = true)
    @Mapping(target = "storeCategory", ignore = true)
    @Mapping(target = "company", source = "companyDB")
    @Mapping(target = "id", source = "store.id")
    @Mapping(target = "name", source = "store.name")
    @Mapping(target = "deleted", source = "store.deleted")
    @Mapping(target = "blocked", source = "store.blocked")
    @Mapping(target = "validatedByAdmin", source = "store.validatedByAdmin")
    @Mapping(target = "address", source = "store.address")
    @Mapping(target = "moderation", ignore = true)
    @Mapping(target = "cover", ignore = true)
    @Mapping(target = "logo", ignore = true)
    StoreDB toEntity(Store store, CompanyDB companyDB);

    @Mapping(target = "timetableList", ignore = true)
    @Mapping(target = "offerList", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "logo", ignore = true)
    @Mapping(target = "cover", ignore = true)
    @Mapping(target = "socialMedia", ignore = true)
    @Mapping(target = "phoneList", ignore = true)
    @Mapping(target = "storeCategory", ignore = true)
    @Mapping(target = "name", source = "store.name")
    @Mapping(target = "description", source = "store.description")
    @Mapping(target = "address", source = "store.address")
    @Mapping(target = "email", source = "store.email")
    @Mapping(target = "website", source = "store.website")
    @Mapping(target = "deleted", source = "store.deleted")
    @Mapping(target = "validatedByAdmin", source = "store.validatedByAdmin")
    @Mapping(target = "blocked", source = "store.blocked")
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "moderation", ignore = true)
    StoreDB toUpdate(Store store, @MappingTarget StoreDB storeDB);

    void update(PracticedOfferBeforeDM practicedOfferBeforeDM,
                @MappingTarget PracticedOfferBeforeDMDB practicedOfferBeforeDMDB);

    @Mapping(target = "category", source = "storeCategory")
    @Mapping(target = "offerNbr", ignore = true)
    @Mapping(target = "companyId", source = "company.id")
    StoreModeration toStoreModeration(StoreDB storeDB);

	@Mapping(target = "timeTable", source = "timetables")
	StoreWithOffersAndTimeTable mapToStoreWithOffersAndTimeTable(Store store, List<Offer> offers,
			List<Timetable> timetables);

}
