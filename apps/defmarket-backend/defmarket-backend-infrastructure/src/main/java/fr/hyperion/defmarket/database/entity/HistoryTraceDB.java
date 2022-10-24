package fr.hyperion.defmarket.database.entity;


import javax.persistence.Column;
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

import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "history_trace", schema = "defmarket")
public class HistoryTraceDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "history_trace_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "history_trace_seq")
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT", length = 5000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserAccountDB userAccountDB;

    @Column(name = "is_deleted")
    private boolean deleted;

    private HistoryTypeEnum historyType;
}
