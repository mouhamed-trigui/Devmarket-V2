package fr.hyperion.defmarket.controller.pro.job;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.ports.jobRef.usecase.GetAllJobRefUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/job")
public class JobController extends AbstractController {

    private final GetAllJobRefUseCase getAllJobRefUseCase;

    @Operation(summary = "GetAll JobsRef")
    @GetMapping
    public ResponseEntity<List<JobRef>> getAllMyJobsRef(@RequestParam(required = false) final Long depth, @RequestParam(required = false) final Long parentId) {
        final List<JobRef> jobList = getAllJobRefUseCase.getAllRef(depth, parentId);
        return ResponseEntity.ok(jobList);
    }
}
