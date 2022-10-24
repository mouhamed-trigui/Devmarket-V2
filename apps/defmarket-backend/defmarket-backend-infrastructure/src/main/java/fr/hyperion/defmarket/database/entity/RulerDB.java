package fr.hyperion.defmarket.database.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "ruler", schema = "defmarket")
public class RulerDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "ruler_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ruler_seq")
    private Long id;

    private String name;
    private String lastName;

    @OneToOne(mappedBy = "ruler", fetch = FetchType.LAZY)
    private CompanyDB company;

    @Column(name = "is_deleted")
    private boolean deleted;

}
