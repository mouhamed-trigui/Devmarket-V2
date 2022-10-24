package fr.hyperion.defmarket.database.entity;


import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class UserAccountCompanyPK implements Serializable {

    private Long companyId;

    private Long userAccountId;

}
