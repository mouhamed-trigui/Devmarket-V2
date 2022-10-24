package fr.hyperion.defmarket.controller.pro.timetable.mapper;

import org.mapstruct.Mapper;

import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.dto.request.timetable.TemporaryClosureRequest;
import fr.hyperion.defmarket.dto.response.timetable.TemporaryClosureResponse;

@Mapper
public interface TemporaryClosureMapper {
    TemporaryClosure toData(TemporaryClosureRequest temporaryClosureRequest);

    TemporaryClosureResponse toResponse(TemporaryClosure temporaryClosure);
}
