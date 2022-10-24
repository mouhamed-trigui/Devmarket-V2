package fr.hyperion.defmarket.adapters.job.mapper;

import java.util.List;
import java.util.Optional;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.database.entity.JobDB;
import fr.hyperion.defmarket.database.entity.JobRefDB;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface JobDBMapper {


    @Mapping(target = "parent", source = "jobRefDB", qualifiedByName = "getParent")
    Job toData(JobDB jobDB);

    @Named("getParent")
    default Job getParent(final List<JobRefDB> jobRefDBS) {
        final Optional<JobDB> parent = jobRefDBS.stream().filter(jobRefDB -> jobRefDB.getDepth() == 1).map(JobRefDB::getJobParent).findFirst();
        return parent.map(this::toData).orElse(null);
    }

    List<Job> toData(List<JobDB> jobDB);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jobRefDB", ignore = true)
    JobDB toEntity(Job job);

    @Mapping(target = "version", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jobRefDB", ignore = true)
    JobDB update(Job job, @MappingTarget JobDB jobDB);
}
