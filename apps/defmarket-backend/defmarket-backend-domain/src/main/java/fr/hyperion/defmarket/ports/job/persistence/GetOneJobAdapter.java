package fr.hyperion.defmarket.ports.job.persistence;

import fr.hyperion.defmarket.data.job.Job;

public interface GetOneJobAdapter {
    Job getJobById(Long id);

}
