package fr.hyperion.defmarket.common.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.dto.request.user.contact.AddressDetailedRequest;
import fr.hyperion.defmarket.dto.request.user.contact.AddressRequest;

@Mapper
public interface AddressMapper {
    @Mapping(target = "street", ignore = true)    
    Address toEntity(AddressRequest addressRequest);

    Address toEntity(AddressRequest addressRequest, @MappingTarget Address address);
    
    Address toEntity(AddressDetailedRequest addressDetailedRequest);

    Address toEntity(AddressDetailedRequest addressDetailedRequest, @MappingTarget Address address);
}
