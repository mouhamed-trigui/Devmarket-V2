package fr.hyperion.defmarket.common.mappers;

import java.util.List;
import java.util.Set;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.database.entity.PhoneDB;
import fr.hyperion.defmarket.database.entity.StoreDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class PhoneDBMapper {

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "store", ignore = true)
    public abstract PhoneDB toEntity(final Phone phone);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "store", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    public abstract PhoneDB update(Phone phone, @MappingTarget PhoneDB phoneDB);

    public void update(final List<Phone> phones, final StoreDB storeDB) {
        if (phones == null) {
            return;
        }

        phones.forEach(phone -> {
            if (phone.getId() == null) {
                final PhoneDB phoneDB = toEntity(phone);
                phoneDB.setStore(storeDB);
                storeDB.getPhoneList().add(phoneDB);
            } else {
                storeDB.getPhoneList().stream().filter(phoneDB -> phoneDB.getId().equals(phone.getId())).findFirst().ifPresent(phoneDB -> update(phone, phoneDB));
            }
        });
    }

    abstract Set<PhoneDB> toEntity(final List<Phone> phone);

    abstract Phone toData(PhoneDB phoneDB);
}
