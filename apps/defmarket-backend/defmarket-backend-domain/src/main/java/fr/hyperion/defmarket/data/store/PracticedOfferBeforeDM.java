package fr.hyperion.defmarket.data.store;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PracticedOfferBeforeDM {

    private boolean practiceOfferBeforeDM = false;

    private String practiceOfferBeforeDMText;

    private String targetedJobsBeforeDM;

}
