package fr.hyperion.defmarket.dto.response.user;

import java.util.ArrayList;
import java.util.List;

import fr.hyperion.defmarket.dto.ValidationError;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorInformationResponse {

    @NonNull
    private String message;

    private String messageDetails;

    private List<ValidationError> objectErrors = new ArrayList<>();

}
