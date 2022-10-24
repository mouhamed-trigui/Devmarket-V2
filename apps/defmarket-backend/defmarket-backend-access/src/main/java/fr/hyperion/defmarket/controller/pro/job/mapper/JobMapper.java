package fr.hyperion.defmarket.controller.pro.job.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.dto.response.job.JobResponse;

@Mapper
public interface JobMapper {
    JobRef toResponseRef(JobRef JobRef);

    List<JobRef> toResponseRef(List<JobRef> jobRefList);

    @Mapping(target = "name", source = "jobName")
    JobResponse toResponse(Job job);
}
