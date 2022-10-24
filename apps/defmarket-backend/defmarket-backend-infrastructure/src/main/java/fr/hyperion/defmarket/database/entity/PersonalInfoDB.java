package fr.hyperion.defmarket.database.entity;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDB<T> {
    private T value;
    private boolean isPublic = true;
}
