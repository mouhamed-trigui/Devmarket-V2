package fr.hyperion.defmarket.data.conciergerieUserAccount;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GenericResponse {
    private String result;
    private RegisterResponseData data;

    @Data
    public static class RegisterResponseData {
        private RegisterResponseInnerData data;
        private String message;
        private String code;
    }

    @Data
    public static class RegisterResponseInnerData {
        private Integer status;
        private Long user_id;
    }

}
