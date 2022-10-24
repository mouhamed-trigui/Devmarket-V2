package fr.hyperion.defmarket.ports.user.mail;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailData {

    private String subject;

    private String message;

    private String to;
}
