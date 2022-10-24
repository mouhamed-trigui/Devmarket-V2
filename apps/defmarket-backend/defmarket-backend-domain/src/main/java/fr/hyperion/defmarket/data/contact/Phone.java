package fr.hyperion.defmarket.data.contact;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Phone {
    private Long id;
    private boolean primary;

    private String prefix;
    private String number;

    @Override
    public String toString() {
        return prefix != null ? prefix + number : "+33" + number;
    }
}
