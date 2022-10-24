package fr.hyperion.defmarket.data.user;

import fr.hyperion.defmarket.data.UserDocument;
import fr.hyperion.defmarket.data.conciergerieUserAccount.ConciergerieUserAccount;
import fr.hyperion.defmarket.data.contact.Address;
import fr.hyperion.defmarket.data.contact.Phone;
import fr.hyperion.defmarket.data.job.Job;
import fr.hyperion.defmarket.enumerated.KnowUsThroughEnum;
import fr.hyperion.defmarket.enumerated.UserActivityEnum;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class UserAccount extends DefmarketUser {
	private static final long serialVersionUID = 1L;
	private Phone phone;
    private Job job;
    private KnowUsThroughEnum knowUsThrough;
    private String knowUsThroughOtherValue;
    private UserActivityEnum activity;
    private Address address;
    private UserDocument documents;
    private Boolean communication;
    private ConciergerieUserAccount conciergerieUserAccount;

    private String crispId;
}
