package fr.hyperion.defmarket.database.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
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
@Table(name = "user_account_company", schema = "defmarket")
public class UserAccountCompanyDB extends AbstractEntity {

    @EmbeddedId
    private UserAccountCompanyPK id;

    @MapsId("companyId")
    @ManyToOne
    private CompanyDB company;

    @MapsId("userAccountId")
    @ManyToOne
    private UserAccountDB userAccount;


}
