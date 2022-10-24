package fr.hyperion.defmarket.database.entity;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "expo_token", schema = "defmarket")
public class ExpoTokenDB extends AbstractEntity {

	@Id
	@SequenceGenerator(name = "expo_token_seq", allocationSize = INCREMENT_BY)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "expo_token_seq")
	private Long id;

    private String expoToken;

    private Instant lastCheck;

    private boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserAccountDB userAccountDB;

    @Column(name = "is_deleted")
    private boolean deleted;

}
