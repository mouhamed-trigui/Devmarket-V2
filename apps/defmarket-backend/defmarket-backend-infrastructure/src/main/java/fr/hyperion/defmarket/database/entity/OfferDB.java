package fr.hyperion.defmarket.database.entity;

import java.time.Instant;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.hibernate.search.engine.backend.types.Searchable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Indexed
@Audited
@NoArgsConstructor
@Table(name = "offer", schema = "defmarket")
public class OfferDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "offer_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "offer_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private OfferTypeEnum offerType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private OfferCategoryEnum offerCategory;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 25)
    private ThemeTypeEnum themeType;

    @Column(name = "offer_value")
    private String value;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_document_id")
    private DocumentDB photo;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "attached_file_id")
    private DocumentDB attachedFile;

    @Basic(optional = false)
    @FullTextField(searchable = Searchable.YES)
    private String title;

    private String description;

    @Basic(optional = false)
    private Instant startOfOffer;

    private Instant endOfOffer;

    private boolean validatedByAdmin;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private StoreDB store;

    @GenericField(searchable = Searchable.YES)
    @Column(name = "is_deleted")
    private boolean deleted;

    private String minOfferValue;
    private String midOfferValue;
    private String maxOfferValue;

    @Column(name = "is_blocked")
    private boolean blocked;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private OfferModeration moderation;

}
