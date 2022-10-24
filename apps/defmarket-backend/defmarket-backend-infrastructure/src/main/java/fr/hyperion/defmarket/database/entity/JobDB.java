package fr.hyperion.defmarket.database.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Audited
@NoArgsConstructor
@Table(name = "Job", schema = "defmarket")

public class JobDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "job_sec", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_sec")
    private Long id;
    private String JobName;

    @OneToMany(mappedBy = "job", fetch = FetchType.LAZY)
    private List<JobRefDB> jobRefDB;
}
