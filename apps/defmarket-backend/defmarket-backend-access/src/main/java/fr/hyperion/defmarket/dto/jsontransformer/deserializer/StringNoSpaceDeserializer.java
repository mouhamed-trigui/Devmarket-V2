package fr.hyperion.defmarket.dto.jsontransformer.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class StringNoSpaceDeserializer extends JsonDeserializer<String> {

    @Override
    public String deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException {
        String text = parser.getText();
        String deserializedText = null;
        if (text != null) {
            deserializedText = text.replace(" ", "");
        }
        return deserializedText;
    }
}
