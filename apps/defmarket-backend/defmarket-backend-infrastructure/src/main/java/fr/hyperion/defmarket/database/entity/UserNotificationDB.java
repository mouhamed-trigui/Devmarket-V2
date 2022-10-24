package fr.hyperion.defmarket.database.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "user_notification", schema = "defmarket")
public class UserNotificationDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "notification_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    private IconTypeEnum iconType;

    @Basic(optional = false)
    private String message;

    @Basic(optional = false)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private UserAccountDB owner;

    @Column(name = "is_deleted")
    private boolean deleted;

}
