package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "documents", schema = "defmarket")
public class DocumentDB extends AbstractEntity {

    @Id
    @SequenceGenerator(name = "document_seq", initialValue = 20, allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "document_seq")
    private Long id;

    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String path;

    private Long size;
}
