package fr.hyperion.defmarket.database.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "default_role", schema = "defmarket")
public class DefaultRoleDB extends AbstractEntity {

    @Id
    @SequenceGenerator(name = "default_role_seq", initialValue = 10, allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "default_role_seq")
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private UserTypeEnum target;

    @OneToMany(mappedBy = "role")
    private List<DefaultRolePermissionsDB> defaultRolePermissions;

}
