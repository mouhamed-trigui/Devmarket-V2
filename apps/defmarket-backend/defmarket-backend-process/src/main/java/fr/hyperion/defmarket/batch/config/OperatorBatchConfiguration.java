package fr.hyperion.defmarket.batch.config;

import javax.sql.DataSource;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import fr.hyperion.defmarket.batch.listeners.JobListener;
import fr.hyperion.defmarket.batch.readers.OperatorReader;
import fr.hyperion.defmarket.batch.tasklet.DeleteUserAccountTasklet;
import fr.hyperion.defmarket.batch.writers.OperatorWriter;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.ports.user.usecase.TraderDeleteUseCase;
import fr.hyperion.defmarket.ports.user.usecase.getters.GetAllTradersToBeDeletedUseCase;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class OperatorBatchConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final DataSource dataSource;
    private final OperatorReader operatorReader;
    private final OperatorWriter operatorWriter;

    private final GetAllTradersToBeDeletedUseCase getAllTradersToBeDeletedUseCase;
    private final TraderDeleteUseCase traderDeleteUseCase;

    @Bean("deleteInactiveUserJob")
    public Job deleteInactiveUserJob() {
        return jobBuilderFactory.get("deleteInactiveUserJob")
            .incrementer(new RunIdIncrementer())
            .listener(new JobListener())
            .flow(deleteInactiveAccountStep())
            .end()
            .build();
    }

    private Step deleteInactiveAccountStep() {
        return stepBuilderFactory.get("deleteInactiveAccountStep")
            .<UserAccountDB, UserAccountDB>chunk(1)
            .reader(operatorReader.inactiveAccountReader(dataSource))
            .writer(operatorWriter.inactiveUserWriter(dataSource))
            .build();
    }

    @Bean("deleteUserJob")
    public Job deleteUserJob() {
        return jobBuilderFactory.get("deleteUserJob")
            .incrementer(new RunIdIncrementer())
            .listener(new JobListener())
            .start(deleteAccountStep())
            .build();
    }

    private Step deleteAccountStep() {
        return stepBuilderFactory.get("deleteAccountStep")
            .tasklet(new DeleteUserAccountTasklet(getAllTradersToBeDeletedUseCase, traderDeleteUseCase))
            .build();
    }
}
