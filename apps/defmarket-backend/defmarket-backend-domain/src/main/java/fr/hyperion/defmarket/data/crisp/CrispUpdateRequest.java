package fr.hyperion.defmarket.data.crisp;

import fr.hyperion.defmarket.enumerated.GenderEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class CrispUpdateRequest {

    @AllArgsConstructor
    @Getter
    private enum Gender {
        MALE("male"), FEMALE("female");
        private final String gender;
    }

    @Data
    @Builder
    static private class Person {
        private String nickname;
        private String address;
        private String gender;
        private String phone;
    }

    private String email;
    private Person person;

    public CrispUpdateRequest(final String email, final String nickname) {
        this.email = email;
        person = Person.builder().nickname(nickname).build();
    }

    public CrispUpdateRequest(final String email, final String nickname, final GenderEnum gender, final String address, final String phone) {
        this.email = email;
        Person.PersonBuilder personBuilder = Person.builder()
            .nickname(nickname);
        if (gender != null) {
            personBuilder = personBuilder.gender(Gender.valueOf(gender.toString()).getGender());
        }
        if (address != null) {
            personBuilder = personBuilder.address(address);
        }
        if (phone != null) {
            personBuilder = personBuilder.phone(phone);
        }
        person = personBuilder.build();
    }
}
