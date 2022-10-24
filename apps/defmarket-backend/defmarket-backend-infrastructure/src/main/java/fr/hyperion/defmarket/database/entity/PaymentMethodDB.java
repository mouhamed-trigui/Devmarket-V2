package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import fr.hyperion.defmarket.enumerated.PaymentMethodEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodDB {

    @Enumerated(EnumType.STRING)
    @Column(length = 5)
    private PaymentMethodEnum name;

    @Column(length = 1000)
    private String condition;
}
