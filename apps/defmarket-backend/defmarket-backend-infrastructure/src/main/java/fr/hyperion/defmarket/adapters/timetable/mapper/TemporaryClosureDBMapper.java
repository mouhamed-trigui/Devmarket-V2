package fr.hyperion.defmarket.adapters.timetable.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.database.entity.TemporaryClosureDB;

@Mapper
public interface TemporaryClosureDBMapper {

    void update(TemporaryClosure temporaryClosure, @MappingTarget TemporaryClosureDB temporaryClosureDB);

    TemporaryClosure toData(TemporaryClosureDB temporaryClosure);
}
