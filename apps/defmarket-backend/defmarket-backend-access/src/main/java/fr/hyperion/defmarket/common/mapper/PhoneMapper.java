package fr.hyperion.defmarket.common.mapper;


import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.dto.request.user.contact.PhoneRequest;
import fr.hyperion.defmarket.dto.response.user.contact.PhoneResponse;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PhoneMapper {
    @Mapping(target = "primary", ignore = true)
    Phone toData(PhoneRequest phoneRequest);

    PhoneResponse toResponse(Phone phone);
}
