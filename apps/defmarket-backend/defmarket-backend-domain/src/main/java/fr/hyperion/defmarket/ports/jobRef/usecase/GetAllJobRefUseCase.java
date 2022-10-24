package fr.hyperion.defmarket.ports.jobRef.usecase;

import java.util.List;

import fr.hyperion.defmarket.data.job.JobRef;

public interface GetAllJobRefUseCase {
    List<JobRef> getAllRef(final Long depth, final Long parentId);
}
