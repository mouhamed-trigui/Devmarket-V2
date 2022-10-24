package fr.hyperion.defmarket.data.job;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JobRef {
    private Long id;
    private Job job;
    private Job jobParent;
    private Long depth;

}
