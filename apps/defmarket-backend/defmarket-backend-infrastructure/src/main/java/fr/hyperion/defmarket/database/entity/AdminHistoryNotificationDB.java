package fr.hyperion.defmarket.database.entity;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;

import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.company.IconTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifStatusEnum;
import fr.hyperion.defmarket.enumerated.notification.NotifTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "admin_history_notification", schema = "defmarket")
public class AdminHistoryNotificationDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "admin_history_notification_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "admin_history_notification_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "icon_type")
    private IconTypeEnum iconType;

    @Basic(optional = false)
    private String message;

    @Basic(optional = false)
    private String title;

    @Column(name = "is_deleted")
    private boolean deleted;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "notification_type")
    private NotifTypeEnum notificationType;

    @Enumerated(EnumType.STRING)
    @JoinColumn(name = "store_type")
    private StoreTypeEnum storeType;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    @Enumerated(EnumType.STRING)
    private NotifStatusEnum status;

    @ElementCollection
    @NotAudited
    @CollectionTable
    private List<AddressDB> addressList;

    @Column(name = "totla_trader_number")
    private Long totalTradersNumber;

    @OneToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    @JoinColumn(name = "store_category_id")
    private StoreCategoryDB storeCategory;


}
