package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ValidateTokenResponse {
    private String result;
    private TokenResponseData data;

    @Data
    public static class TokenResponseData {
        private String message;
        private String code;
    }

}
