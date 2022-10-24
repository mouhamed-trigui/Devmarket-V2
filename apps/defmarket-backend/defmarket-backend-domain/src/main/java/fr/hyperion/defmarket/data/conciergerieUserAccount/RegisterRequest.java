package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private String phoneNumber;
}
