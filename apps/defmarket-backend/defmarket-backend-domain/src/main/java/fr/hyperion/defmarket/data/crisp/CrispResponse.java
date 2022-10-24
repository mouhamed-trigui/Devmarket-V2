package fr.hyperion.defmarket.data.crisp;

import java.util.LinkedHashMap;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CrispResponse {
    private boolean error;
    private String reason;
    private LinkedHashMap data;
}


