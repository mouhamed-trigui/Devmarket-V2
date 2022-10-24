package fr.hyperion.defmarket.data;

import fr.hyperion.defmarket.data.document.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDocument {
    private Document justificationVeteran;
    private Document avatar;
    private Document justificationIdentity;
}
