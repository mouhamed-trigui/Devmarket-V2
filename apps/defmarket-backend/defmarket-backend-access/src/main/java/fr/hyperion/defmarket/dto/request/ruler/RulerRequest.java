package fr.hyperion.defmarket.dto.request.ruler;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fr.hyperion.defmarket.dto.jsontransformer.deserializer.StringTrimDeserializer;


import javax.validation.constraints.NotBlank;

public class RulerRequest {

    @NotBlank
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String name;

    @NotBlank
    @JsonDeserialize(using = StringTrimDeserializer.class)
    public String lastName;
}
