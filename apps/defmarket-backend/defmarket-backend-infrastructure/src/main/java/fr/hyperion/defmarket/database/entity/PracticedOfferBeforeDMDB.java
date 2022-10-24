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
public class PracticedOfferBeforeDMDB {

    @Column(name = "is_practiceOfferBeforeDM")
    private boolean practiceOfferBeforeDM = false;

    private String practiceOfferBeforeDMText;

    private String targetedJobsBeforeDM;

}
