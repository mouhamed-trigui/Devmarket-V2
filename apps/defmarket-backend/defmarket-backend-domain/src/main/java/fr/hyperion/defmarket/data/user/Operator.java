package fr.hyperion.defmarket.data.user;

import java.time.LocalDate;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Operator extends UserAccount {

    private String lastName;

    private LocalDate birthday;

    private boolean veteran = false;

    public String birthCity;

    public String newEmail;

    private CompleteRegistration completeRegistration = new CompleteRegistration();

}
