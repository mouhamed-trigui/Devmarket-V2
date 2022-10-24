package fr.hyperion.defmarket.database.entity;


import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "ConciergerieUserAccount", schema = "defmarket")
public class ConciergerieUserAccountDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "conciergerie_user_account_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "conciergerie_user_account_seq")
    private Long id;

    private Long conciergerie_user_account_id;

    private String conversation_id;

    @Convert(converter = CryptoConverterString.class)
    private String password;

    @Column(name = "is_deleted")
    private boolean deleted;

}
