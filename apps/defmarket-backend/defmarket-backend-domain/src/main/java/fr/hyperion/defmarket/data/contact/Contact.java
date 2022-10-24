package fr.hyperion.defmarket.data.contact;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Contact {

    private Phone phone;

    private List<Email> emailList;
}
