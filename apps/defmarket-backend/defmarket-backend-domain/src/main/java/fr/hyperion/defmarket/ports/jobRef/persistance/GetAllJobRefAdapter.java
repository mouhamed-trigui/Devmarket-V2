package fr.hyperion.defmarket.ports.jobRef.persistance;

import java.util.List;

import fr.hyperion.defmarket.data.job.JobRef;

public interface GetAllJobRefAdapter {

    List<JobRef> getAllRef(Long depth, Long parentId);
}
