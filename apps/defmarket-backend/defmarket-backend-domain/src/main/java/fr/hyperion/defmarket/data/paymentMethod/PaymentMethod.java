package fr.hyperion.defmarket.data.paymentMethod;

import fr.hyperion.defmarket.enumerated.PaymentMethodEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethod {
    private PaymentMethodEnum name;

    private String condition;
}
