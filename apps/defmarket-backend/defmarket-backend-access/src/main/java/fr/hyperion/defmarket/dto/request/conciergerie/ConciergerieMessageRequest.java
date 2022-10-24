package fr.hyperion.defmarket.dto.request.conciergerie;

import java.io.Serializable;

import javax.validation.constraints.NotNull;


public class ConciergerieMessageRequest implements Serializable {

    @NotNull
    public String message;


}
