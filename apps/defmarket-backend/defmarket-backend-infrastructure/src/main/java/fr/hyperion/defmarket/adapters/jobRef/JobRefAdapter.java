package fr.hyperion.defmarket.adapters.jobRef;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.adapters.jobRef.mapper.JobRefDBMapper;
import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.database.entity.JobRefDB;
import fr.hyperion.defmarket.database.repository.JobRefRepository;
import fr.hyperion.defmarket.database.specification.JobRefSpecification;
import fr.hyperion.defmarket.ports.jobRef.persistance.GetAllJobRefAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobRefAdapter implements GetAllJobRefAdapter {

    private final JobRefRepository jobRefRepository;
    private final JobRefDBMapper jobRefDBMapper;


    @Override
    @Transactional
    public List<JobRef> getAllRef(final Long depth, final Long parentId) {
        final Specification<JobRefDB> jobRefDBSpecification = Specification.where(JobRefSpecification.byDepth(depth))
            .and(JobRefSpecification.byParentId(parentId));

        final List<JobRefDB> jobRefList = jobRefRepository.findAll(jobRefDBSpecification);
        return jobRefDBMapper.toData(jobRefList);
    }


}
