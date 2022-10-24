package fr.hyperion.defmarket.data.internet;

import fr.hyperion.defmarket.enumerated.SocialMediaNameEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SocialMedia {
    private Long id;
    private SocialMediaNameEnum type;
    private String value;
}
