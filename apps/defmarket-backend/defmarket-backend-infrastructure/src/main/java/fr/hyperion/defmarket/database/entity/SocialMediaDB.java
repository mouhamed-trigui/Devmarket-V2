package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import fr.hyperion.defmarket.enumerated.SocialMediaNameEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "social_media", schema = "defmarket")
public class SocialMediaDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "social_media_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "social_media_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    private SocialMediaNameEnum type;

    @Column(length = 500, name = "social_media_value")
    private String value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private StoreDB store;
}
