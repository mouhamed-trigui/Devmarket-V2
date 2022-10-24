package fr.hyperion.defmarket.database.entity;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name = "announcement", schema = "defmarket")
public class AnnouncementDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "announcement_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "announcement_seq")
    private Long id;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "logo_document_id")
    private DocumentDB image;

    @Basic(optional = false)
    private String title;

    @Column(length = 999)
    private String description;

    @Column(name = "is_visible")
    private boolean visible = false;

    @Column(name = "is_deleted")
    private boolean deleted;

}
