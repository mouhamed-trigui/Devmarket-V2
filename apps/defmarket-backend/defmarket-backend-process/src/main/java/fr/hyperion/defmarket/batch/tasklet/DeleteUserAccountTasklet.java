package fr.hyperion.defmarket.batch.tasklet;

import java.util.List;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

import fr.hyperion.defmarket.ports.user.usecase.TraderDeleteUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllTradersToBeDeletedUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@RequiredArgsConstructor
public class DeleteUserAccountTasklet implements Tasklet, StepExecutionListener {

    private final GetAllTradersToBeDeletedUseCase getAllTradersToBeDeletedUseCase;
    private final TraderDeleteUseCase traderDeleteUseCase;

    @Override
    public void beforeStep(final StepExecution stepExecution) {
        log.info("DeleteUserAccountTasklet.beforeStep");
    }

    @Override
    public ExitStatus afterStep(final StepExecution stepExecution) {
        log.info("DeleteUserAccountTasklet.afterStep");
        return ExitStatus.COMPLETED;
    }

    @Override
    public RepeatStatus execute(final StepContribution stepContribution, final ChunkContext chunkContext) {
        final List<Long> allTradersToBeDeletedIds = getAllTradersToBeDeletedUseCase.getAllTradersToBeDeleted();
        traderDeleteUseCase.deleteTraders(allTradersToBeDeletedIds);
        return RepeatStatus.FINISHED;
    }
}
