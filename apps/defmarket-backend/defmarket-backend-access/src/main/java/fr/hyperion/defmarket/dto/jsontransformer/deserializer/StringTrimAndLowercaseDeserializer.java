package fr.hyperion.defmarket.dto.jsontransformer.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class StringTrimAndLowercaseDeserializer extends JsonDeserializer<String> {

    @Override
    public String deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException {
        final String text = parser.getText();
        return text != null ? text.trim().toLowerCase() : null;
    }
}
