package fr.hyperion.defmarket.adapters.job;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.job.mapper.JobDBMapper;
import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.database.entity.JobDB;
import fr.hyperion.defmarket.database.repository.PublicJobRepository;
import fr.hyperion.defmarket.ports.job.persistence.GetOneJobAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JobAdapter implements GetOneJobAdapter {

    private final PublicJobRepository publicJobRepository;
    private final JobDBMapper jobDBMapper;


    @Override
    @Transactional(readOnly = true)
    public Job getJobById(final Long id) {
        final JobDB job = publicJobRepository.findById(id).orElseThrow();
        return jobDBMapper.toData(job);
    }
}
