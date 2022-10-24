package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import fr.hyperion.defmarket.database.cryptoconverter.CryptoConverterString;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "phone", schema = "defmarket")
public class PhoneDB extends AbstractEntity {

    @Id
    @SequenceGenerator(name = "phone_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "phone_seq")
    private Long id;

    @Column(name = "primary_user_phone")
    private boolean primary = false;

    @Column(length = 5)
    private String prefix;

    @Column(nullable = false)
    @Convert(converter = CryptoConverterString.class)
    private String number;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private StoreDB store;
}
