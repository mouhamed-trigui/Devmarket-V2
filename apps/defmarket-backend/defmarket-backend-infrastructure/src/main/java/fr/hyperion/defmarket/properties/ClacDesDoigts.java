package fr.hyperion.defmarket.properties;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClacDesDoigts {
    @NotBlank
    private String apiBaseUrl;
    private String authUrl;
    private String validateTokenUrl;
    private String newConversation;
    private String createUserUrl;
    private String userName;
    private String password;
    private String authToken;
}
