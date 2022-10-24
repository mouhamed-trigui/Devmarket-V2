package fr.hyperion.defmarket.data.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompleteRegistration {

    private boolean profileCompleted = false;

    private boolean companyCompleted = false;

    private boolean storeCompleted = false;

    private boolean offerCompleted = false;

    private boolean identityValidated = false;

    private boolean storeValidated = false;

}
