package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CompleteRegistrationDB {

    @Column(name = "is_profile_completed")
    private boolean profileCompleted = false;

    @Column(name = "is_company_completed")
    private boolean companyCompleted = false;

    @Column(name = "is_store_completed")
    private boolean storeCompleted = false;

    @Column(name = "is_offer_completed")
    private boolean offerCompleted = false;

    @Column(name = "is_identity_validated")
    private boolean identityValidated = false;

    @Column(name = "is_store_validated")
    private boolean storeValidated = false;


}
