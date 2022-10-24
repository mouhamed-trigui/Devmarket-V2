package fr.hyperion.defmarket.common.mappers;

import java.util.Set;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.user.ExpoToken;
import fr.hyperion.defmarket.database.entity.ExpoTokenDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ExpoTokenDBMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(ignore = true, target = "createdBy")
    @Mapping(ignore = true, target = "createdDate")
    @Mapping(ignore = true, target = "lastModifiedBy")
    @Mapping(ignore = true, target = "lastModifiedDate")
    @Mapping(ignore = true, target = "version")
    @Mapping(ignore = true, target = "userAccountDB")
    @Mapping(ignore = true, target = "deleted")
    ExpoTokenDB toEntity(ExpoToken expoToken);

    @Mapping(ignore = true, target = "createdBy")
    @Mapping(ignore = true, target = "createdDate")
    @Mapping(ignore = true, target = "lastModifiedBy")
    @Mapping(ignore = true, target = "lastModifiedDate")
    @Mapping(ignore = true, target = "version")
    @Mapping(target = "userAccountDB", source = "accountDB")
    ExpoTokenDB toEntity(ExpoToken expoToken, UserAccountDB accountDB);

    ExpoToken toData(ExpoTokenDB expoTokenDB);

    Set<ExpoTokenDB> toSetOfEntities(Set<ExpoToken> expoTokens);

    Set<ExpoToken> toSetOfData(Set<ExpoTokenDB> expoTokens);

}
