package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateConversationResponse {
    private String reference;
    private String webhook;
}
