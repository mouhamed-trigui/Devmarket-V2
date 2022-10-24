package fr.hyperion.defmarket.database.entity;

import static org.hibernate.envers.RelationTargetAuditMode.NOT_AUDITED;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.search.engine.backend.types.Searchable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;
import org.locationtech.jts.geom.Geometry;

import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Indexed
@Entity
@Audited
@NoArgsConstructor
@Table(name = "store", schema = "defmarket")
public class StoreDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "store_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_seq")
    private Long id;

    @FullTextField(analyzer = "ignoreCase")
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private StoreTypeEnum storeType;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "logo_document_id")
    private DocumentDB logo;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_document_id")
    private DocumentDB cover;

    @Basic(optional = false)
    @FullTextField(searchable = Searchable.YES)
    private String name;

    @Column(length = 999)
    private String description;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private CompanyDB company;

    @Embedded
    @IndexedEmbedded
    private AddressDB address;

    private Geometry geolocation;

    @Column(name = "is_visible")
    private boolean visible = true;

    private boolean validatedByAdmin;

    @Column(name = "is_eCommerceAndPhysicalStore")
    private boolean eCommerceAndPhysicalStore;

    @Embedded
    private PracticedOfferBeforeDMDB practicedOfferBeforeDM;


    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<PhoneDB> phoneList = new ArrayList<>();

    public void addPhone(final PhoneDB phone) {
        phoneList.add(phone);
        phone.setStore(this);
    }

    public void removePhone(final PhoneDB phone) {
        phoneList.remove(phone);
        phone.setStore(null);
    }

    @Embedded
    @AttributeOverrides({@AttributeOverride(name = "isPublic", column = @Column(name = "website_is_public")), @AttributeOverride(name = "value", column = @Column(name = "website_url"))})
    private PersonalInfoDB<String> website;

    private String email;

    private boolean hideMyContacts;

    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<SocialMediaDB> socialMedia = new ArrayList<>();

    public void addSocialMedia(final SocialMediaDB socialMedia) {
        this.socialMedia.add(socialMedia);
        socialMedia.setStore(this);
    }

    public void removeSocialMedia(final SocialMediaDB socialMedia) {
        this.socialMedia.remove(socialMedia);
        socialMedia.setStore(null);
    }

    @NotAudited
    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<OfferDB> offerList;

    @GenericField(searchable = Searchable.YES)
    @Column(name = "is_deleted")
    private boolean deleted;

    @Column(name = "is_blocked")
    private boolean blocked;

    @OneToMany(mappedBy = "store", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH}, orphanRemoval = true)
    private List<TimetableDB> timetableList = new java.util.ArrayList<>();

    @Embedded
    private TemporaryClosureDB temporaryClosure;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_category_id")
    @Audited(targetAuditMode = NOT_AUDITED)
    private StoreCategoryDB storeCategory;

    @ElementCollection
    @CollectionTable(name = "store_payment_method")
    @NotAudited
    private List<PaymentMethodDB> paymentMethods = new ArrayList<>();

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private StoreModeration moderation;

    @Transient
    private Double distance;
}
