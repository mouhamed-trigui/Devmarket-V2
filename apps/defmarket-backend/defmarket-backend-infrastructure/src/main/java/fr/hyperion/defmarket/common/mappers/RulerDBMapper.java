package fr.hyperion.defmarket.common.mappers;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.adapters.user.mapper.UserDBMapper;
import fr.hyperion.defmarket.data.company.Ruler;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.RulerDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {UserDBMapper.class, AddressDBMapper.class})
public interface RulerDBMapper {

    Ruler toData(RulerDB rulerDB);

    List<Ruler> toData(List<RulerDB> rulerDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "company", source = "companyDB")
    @Mapping(target = "id", source = "ruler.id")
    @Mapping(target = "name", source = "ruler.name")
    @Mapping(target = "deleted", source = "ruler.deleted")
    @Mapping(target = "lastName", source = "ruler.lastName")
    RulerDB toEntity(Ruler ruler, CompanyDB companyDB);


    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "company", ignore = true)
    RulerDB toEntity(Ruler ruler);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "company", source = "companyDB")
    @Mapping(target = "name", source = "ruler.name")
    @Mapping(target = "deleted", source = "ruler.deleted")
    @Mapping(target = "lastName", source = "ruler.lastName")

    RulerDB toEntity(Ruler ruler, CompanyDB companyDB, @MappingTarget RulerDB rulerDB);

}
