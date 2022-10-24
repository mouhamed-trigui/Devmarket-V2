package fr.hyperion.defmarket.data.job;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Job {
    private Long id;
    private String jobName;
    private Job parent;
}
