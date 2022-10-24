package fr.hyperion.defmarket.dto.request.user;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimAndLowercaseDeserializer;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsernameAndPasswordAuthenticationRequest {

    @NotBlank(message = "username can't be null !!")
    @JsonDeserialize(using = StringTrimAndLowercaseDeserializer.class)
    private String email;

    @NotBlank(message = "password can't be null !!")
    private String password;

    private String expoToken;

    private UserTypeEnum userType;
}
