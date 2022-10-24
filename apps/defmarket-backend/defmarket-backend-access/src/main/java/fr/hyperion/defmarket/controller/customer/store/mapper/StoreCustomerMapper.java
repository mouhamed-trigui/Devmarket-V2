package fr.hyperion.defmarket.controller.customer.store.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.common.mapper.AddressMapper;
import fr.hyperion.defmarket.common.mapper.GeolocationMapper;
import fr.hyperion.defmarket.common.mapper.PhoneMapper;
import fr.hyperion.defmarket.common.mapper.SocialMediaMapper;
import fr.hyperion.defmarket.controller.customer.offer.mapper.OfferCustomerMapper;
import fr.hyperion.defmarket.controller.customer.timetable.mapper.CustomerTimetableMapper;
import fr.hyperion.defmarket.controller.pro.timetable.mapper.TemporaryClosureMapper;
import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.data.store.Store;
import fr.hyperion.defmarket.data.store.StoreWithOffersAndTimeTable;
import fr.hyperion.defmarket.data.store.StoreWithTimeTable;
import fr.hyperion.defmarket.dto.request.store.CustomerStoreFilterRequest;
import fr.hyperion.defmarket.dto.response.store.CustomerStoreDetailsResponse;
import fr.hyperion.defmarket.dto.response.store.StoreResponse;
import fr.hyperion.defmarket.dto.response.store.StoreWithTimeTableResponse;

@Mapper(uses = {AddressMapper.class, GeolocationMapper.class, PhoneMapper.class, SocialMediaMapper.class,
    TemporaryClosureMapper.class, OfferCustomerMapper.class, CustomerTimetableMapper.class})
public interface StoreCustomerMapper {

    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    StoreResponse mapToStoreResponse(Store store);

    CustomerStoreFilter mapToCustomerStoreFilter(CustomerStoreFilterRequest customerStoreFilterRequest);

    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    @Mapping(target = "timeTable", source = "timetableList")
    StoreWithTimeTableResponse mapToStoreWithTimeTableResponse(StoreWithTimeTable storeWithTimeTable);

    @Mapping(target = "eCommerceAndPhysicalStore", source = "ECommerceAndPhysicalStore")
    CustomerStoreDetailsResponse mapToCustomerStoreDetailsResponse(StoreWithOffersAndTimeTable store);

}
