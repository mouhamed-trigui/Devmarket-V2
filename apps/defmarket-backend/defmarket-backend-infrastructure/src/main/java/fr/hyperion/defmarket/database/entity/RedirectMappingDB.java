package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import fr.hyperion.defmarket.enumerated.JwtEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Indexed
@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "redirectMapping", schema = "defmarket")
public class RedirectMappingDB extends AbstractEntity {

    @Id
    @Column(length = 36)
    private String uuid;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JwtEnum action;

    private Long UserId;

    @Column(columnDefinition = "TEXT")
    private String token;
}
