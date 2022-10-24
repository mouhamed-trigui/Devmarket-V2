package fr.hyperion.defmarket.controller.admin.store.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.common.mapper.AddressMapper;
import fr.hyperion.defmarket.common.mapper.GeolocationMapper;
import fr.hyperion.defmarket.common.mapper.PhoneMapper;
import fr.hyperion.defmarket.common.mapper.SocialMediaMapper;
import fr.hyperion.defmarket.controller.pro.timetable.mapper.TemporaryClosureMapper;
import fr.hyperion.defmarket.data.store.PracticedOfferBeforeDM;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.dto.request.store.PracticedOfferBeforeDMRequest;
import fr.hyperion.defmarket.dto.request.store.StoreCreationRequest;
import fr.hyperion.defmarket.dto.request.store.StoreUpdateRequest;
import fr.hyperion.defmarket.dto.response.store.AdminStoreDetailedResponse;
import fr.hyperion.defmarket.dto.response.store.AdminStoreResponse;
import fr.hyperion.defmarket.dto.response.store.StoreDetailedWithCompanyIdResponse;
import fr.hyperion.defmarket.dto.response.store.StoreResponse;

@Mapper(uses = {AddressMapper.class, GeolocationMapper.class, PhoneMapper.class, SocialMediaMapper.class, TemporaryClosureMapper.class})
public interface StoreAdminMapper {
    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    AdminStoreResponse toResponse(Store store);

    @Mapping(target = "distance", ignore = true)
    @Mapping(target = "offerNbr", ignore = true)
    @Mapping(target = "website", ignore = true)
    @Mapping(target = "visible", ignore = true)
    @Mapping(target = "socialMedia", ignore = true)
    @Mapping(target = "phoneList", ignore = true)
    @Mapping(target = "geolocation", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "temporaryClosure", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "hideMyContacts", ignore = true)
    @Mapping(target = "paymentMethods", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "ECommerceAndPhysicalStore", source = "eCommerceAndPhysicalStore")
    Store toEntity(StoreCreationRequest storeCreationRequest);

    @Mapping(target = "distance", ignore = true)
    @Mapping(target = "visible", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "logo", ignore = true)
    @Mapping(target = "cover", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    @Mapping(target = "validatedByAdmin", ignore = true)
    @Mapping(target = "storeType", ignore = true)
    @Mapping(target = "temporaryClosure", ignore = true)
    @Mapping(target = "ECommerceAndPhysicalStore", ignore = true)
    @Mapping(target = "practicedOfferBeforeDM", ignore = true)
    @Mapping(target = "offerNbr", ignore = true)
    @Mapping(target = "category", ignore = true)
    Store toUpdate(StoreUpdateRequest storeUpdateRequest, @MappingTarget Store store);

    List<AdminStoreResponse> toAdminStoreResponse(List<Store> allCompanyStores);

    List<StoreResponse> toResponse(List<Store> allCompanyStores);

    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    AdminStoreDetailedResponse toDetailedResponse(Store store);

    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    @Mapping(target = "companyId", source = "company.id")
    StoreDetailedWithCompanyIdResponse toDetailedWithCompanyIdResponse(Store store);

    PracticedOfferBeforeDM toData(PracticedOfferBeforeDMRequest moreStoreInfoUpdateRequest);
}
