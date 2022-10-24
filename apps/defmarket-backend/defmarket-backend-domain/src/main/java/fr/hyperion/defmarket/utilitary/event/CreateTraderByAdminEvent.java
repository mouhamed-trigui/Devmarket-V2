package fr.hyperion.defmarket.utilitary.event;

import java.time.Instant;
import java.time.temporal.TemporalUnit;

import fr.hyperion.defmarket.enumerated.JwtEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateTraderByAdminEvent implements CustomEvent {

    private String email;
    private JwtEnum jwtRole;
    private String root;
    private String subject;
    private String message;
    private int tokenValidity;
    private TemporalUnit tmp;
    private String id;
    private Object source;
    private Instant timestamp;
}
