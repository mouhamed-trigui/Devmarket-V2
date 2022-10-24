package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConciergerieUserAccount {

    private Long id;

    private Long conciergerieUserAccountId;

    private String conversationId;

    private String password;

    private boolean deleted;

}
