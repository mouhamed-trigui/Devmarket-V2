package fr.hyperion.defmarket.database.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

import fr.hyperion.defmarket.enumerated.company.CompanyTypeEnum;
import fr.hyperion.defmarket.enumerated.company.LeaderTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Indexed
@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "company", schema = "defmarket")
public class CompanyDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "company_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 25)
    private CompanyTypeEnum companyType;

    @Basic(optional = false)
    @FullTextField(searchable = Searchable.YES)
    private String name;

    @FullTextField(searchable = Searchable.YES)
    private String siren;

    private String tva;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private LeaderTypeEnum leaderType;

    @Embedded
    private AddressDB address;

    private boolean validatedByAdmin;

    @NotAudited
    @OneToMany(mappedBy = "company", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<StoreDB> storeList;

    @NotAudited
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private RulerDB ruler;

    @GenericField(searchable = Searchable.YES)
    @Column(name = "is_deleted")
    private boolean deleted;

    @Column(name = "is_blocked")
    private boolean blocked;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserAccountCompanyDB> userCompanyList = new ArrayList<>();

    @Column(columnDefinition = "TEXT", length = 3000)
    private String otherActivity;

    public void addUserToCompany(final UserAccountDB userAccountDB) {
        final UserAccountCompanyDB userAccountCompanyDB = new UserAccountCompanyDB();
        final UserAccountCompanyPK userAccountCompanyPK = new UserAccountCompanyPK();
        userAccountCompanyPK.setUserAccountId(userAccountDB.getId());
        userAccountCompanyDB.setId(userAccountCompanyPK);
        userAccountCompanyDB.setCompany(this);
        userAccountCompanyDB.setUserAccount(userAccountDB);
        userCompanyList.add(userAccountCompanyDB);
    }
}
