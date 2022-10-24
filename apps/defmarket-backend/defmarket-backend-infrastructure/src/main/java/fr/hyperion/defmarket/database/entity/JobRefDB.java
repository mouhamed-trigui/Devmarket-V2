package fr.hyperion.defmarket.database.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "JobRef", schema = "defmarket")


public class JobRefDB {
    @Id
    @SequenceGenerator(name = "job_sec", allocationSize = 10)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_sec")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobDB job;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_parent_id")
    private JobDB jobParent;

    private Long depth;


}
