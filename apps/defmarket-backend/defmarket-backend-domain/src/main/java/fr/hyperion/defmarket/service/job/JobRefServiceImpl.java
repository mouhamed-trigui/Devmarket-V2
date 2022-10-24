package fr.hyperion.defmarket.service.job;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.ports.jobRef.persistance.GetAllJobRefAdapter;
import fr.hyperion.defmarket.ports.jobRef.usecase.GetAllJobRefUseCase;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class JobRefServiceImpl implements GetAllJobRefUseCase {

    private final GetAllJobRefAdapter getAllJobRefAdapter;

    @Override
    public List<JobRef> getAllRef(final Long depth, final Long parentId) {
        return getAllJobRefAdapter.getAllRef(depth, parentId);
    }


}
