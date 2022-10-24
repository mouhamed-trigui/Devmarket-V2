package fr.hyperion.defmarket.adapters.jobRef.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.adapters.job.mapper.JobDBMapper;
import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.database.entity.JobRefDB;

@Mapper(uses = JobDBMapper.class)
public interface JobRefDBMapper {

    JobRef toData(JobRefDB jobRefDB);

    List<JobRef> toData(List<JobRefDB> jobRefDBS);


    @Mapping(target = "id", ignore = true)
    JobRefDB toEntity(JobRefDB jobRefDB);


}
