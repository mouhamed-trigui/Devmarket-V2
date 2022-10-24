package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "permission", schema = "defmarket")
public class PermissionDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "permission_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "permission_seq")
    private Long id;

    @NotNull
    @NotBlank
    @Column(unique = true)
    private String name;

    private String description;
}
