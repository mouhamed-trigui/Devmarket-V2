package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponse {
    private String result;
    private AuthData data;

    @Data
    public static class AuthData {
        private String token;
        private String user_email;
        private String user_id;
    }
}
