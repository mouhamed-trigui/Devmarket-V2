package fr.hyperion.defmarket.data.conciergerieUserAccount;

import fr.hyperion.defmarket.data.document.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SendMessage {
    private Sender sender;
    private String subject;
    private String body;
    private String body_format;
    private Document attachment;
}
