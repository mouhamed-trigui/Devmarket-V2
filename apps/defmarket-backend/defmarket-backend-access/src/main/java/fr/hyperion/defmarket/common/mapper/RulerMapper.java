package fr.hyperion.defmarket.common.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.company.Ruler;
import fr.hyperion.defmarket.dto.request.ruler.RulerRequest;
import fr.hyperion.defmarket.dto.response.ruler.RulerResponse;

@Mapper(uses = DocumentMapper.class)
public interface RulerMapper {

    RulerResponse toResponse(Ruler ruler);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Ruler toEntity(RulerRequest rulerRequest);

    List<RulerResponse> toResponse(List<Ruler> allCompanyRulers);
}
