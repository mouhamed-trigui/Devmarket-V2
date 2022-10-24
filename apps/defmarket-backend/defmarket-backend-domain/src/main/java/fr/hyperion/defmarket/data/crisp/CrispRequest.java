package fr.hyperion.defmarket.data.crisp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CrispRequest {

    @Data
    @AllArgsConstructor
    private static class Person {
        private String nickname;
    }

    private String email;
    private Person person;

    public CrispRequest(final String email, final String nickname) {
        this.email = email;
        person = new Person(nickname);
    }
}
