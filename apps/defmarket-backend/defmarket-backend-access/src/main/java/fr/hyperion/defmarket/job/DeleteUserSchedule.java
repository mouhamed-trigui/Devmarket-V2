package fr.hyperion.defmarket.job;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class DeleteUserSchedule {

    private JobLauncher jobLauncher;
    private Job deleteInactiveUserJob;
    private Job deleteUserJob;

    @Scheduled(cron = "0 0 0 * * *")
    public void deleteBachScheduling() throws JobExecutionAlreadyRunningException, JobRestartException,
        JobInstanceAlreadyCompleteException, JobParametersInvalidException {
        log.info("START JOB");
        final JobParameters jobParameters = new JobParametersBuilder().addLong("time", System.currentTimeMillis())
            .toJobParameters();
        jobLauncher.run(deleteInactiveUserJob, jobParameters);
        jobLauncher.run(deleteUserJob, jobParameters);
    }
}
