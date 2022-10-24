package fr.hyperion.defmarket.database.entity;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.search.engine.backend.types.Searchable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.database.cryptoconverter.CryptoConverterLocalDate;
import fr.hyperion.defmarket.database.cryptoconverter.CryptoConverterString;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Indexed
@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "user_account", schema = "defmarket")
public class UserAccountDB extends AbstractEntity {

    @Id
    @SequenceGenerator(name = "user_account_seq", initialValue = 3, allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_account_seq")
    @GenericField(searchable = Searchable.YES)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "avatar_document_id")
    private DocumentDB avatar;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "justification_identity_document_id")
    private DocumentDB justificationIdentity;

    @Convert(converter = CryptoConverterString.class)
    @FullTextField(searchable = Searchable.YES)
    private String firstName;

    @Convert(converter = CryptoConverterString.class)
    @FullTextField(searchable = Searchable.YES)
    private String lastName;

    @FullTextField(searchable = Searchable.YES)
    @Convert(converter = CryptoConverterString.class)
    private String email;

    private String newEmail;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private GenderEnum gender;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    @FullTextField(searchable = Searchable.YES)
    private UserTypeEnum userType;

    @Convert(converter = CryptoConverterLocalDate.class)
    private LocalDate birthday;

    @Basic(optional = false)
    private String password;

    @Column(name = "is_blocked")
    private boolean blocked;

    @Column(name = "is_expired")
    private boolean expired;

    private boolean mailValidated;

    @GenericField(searchable = Searchable.YES)
    @Column(name = "is_deleted")
    private boolean deleted;

    @Column(name = "pushNotificationActive")
    private boolean pushNotificationActive;

    @Column(name = "is_veteran")
    private boolean veteran;

    @Column(name = "is_communication")
    private Boolean communication;

    private boolean validatedByAdmin;

    private boolean validatedInfoByAdmin;

    private boolean moreInfoRequestedByAdmin;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private KnowUsThroughEnum knowUsThrough;

    private String knowUsThroughOtherValue;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private UserActivityEnum activity;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "justification_veteran_document_id")
    private DocumentDB justificationVeteran;

    @Embedded
    private AddressDB address;

    @Convert(converter = CryptoConverterString.class)
    private String birthCity;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @NotAudited
    private PhoneDB phone;

    @NotAudited
    @OneToMany(mappedBy = "userAccountDB", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ExpoTokenDB> expoTokens = new ArrayList<>();

    public void addExpoToken(final ExpoTokenDB expoTokenDB) {
        Assert.notNull(expoTokenDB, "ExpoTokenDB can't be null");
        expoTokens.add(expoTokenDB);
    }

    @NotAudited
    @OneToMany(mappedBy = "userAccountDB", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<HistoryTraceDB> historyTraces = new ArrayList<>();

    @NotAudited
    @OneToMany(mappedBy = "owner", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<UserNotificationDB> notificationList = new ArrayList<>();

    @Embedded
    private CompleteRegistrationDB completeRegistration;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
    private List<UserAccountCompanyDB> userCompanyList = new ArrayList<>();

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @NotAudited
    private JobDB job;

    private Instant deleteRequestDate;

    public void addCompanyToUser(final CompanyDB companyDB) {
        final UserAccountCompanyDB userAccountCompanyDB = new UserAccountCompanyDB();
        final UserAccountCompanyPK userAccountCompanyPK = new UserAccountCompanyPK();
        userAccountCompanyPK.setCompanyId(companyDB.getId());
        userAccountCompanyDB.setId(userAccountCompanyPK);
        userAccountCompanyDB.setCompany(companyDB);
        userAccountCompanyDB.setUserAccount(this);
        getUserCompanyList().add(userAccountCompanyDB);
    }

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserRoleDB> roles = new ArrayList<>();

    private String crispId;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @NotAudited
    @JoinColumn(name = "conciergerie_user_account_id")
    private ConciergerieUserAccountDB conciergerieUserAccount;

}
