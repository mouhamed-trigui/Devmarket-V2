package fr.hyperion.defmarket.common.mappers;

import java.util.List;
import java.util.Set;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.database.entity.AddressDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AddressDBMapper {

    AddressDB toEntity(final Address address);

    Set<AddressDB> toEntity(List<Address> address);

    Address toData(AddressDB addressDB);

    List<Address> toData(List<AddressDB> addressDB);
}
