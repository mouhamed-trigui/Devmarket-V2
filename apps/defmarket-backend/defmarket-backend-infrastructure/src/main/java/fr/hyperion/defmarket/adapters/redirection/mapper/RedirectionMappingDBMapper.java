package fr.hyperion.defmarket.adapters.redirection.mapper;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.redirection.RedirectMapping;
import fr.hyperion.defmarket.database.entity.RedirectMappingDB;

@Mapper
public interface RedirectionMappingDBMapper {

    RedirectMapping toData(RedirectMappingDB redirectMappingDB);

}
