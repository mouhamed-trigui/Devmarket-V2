package fr.hyperion.defmarket.dto.response.conciergerie;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConciergerieUserAccountResponse {

    public Long id;

    public Long conciergerieUserAccountId;

    public String password;

    public boolean deleted;

    public String conversationId;
}
