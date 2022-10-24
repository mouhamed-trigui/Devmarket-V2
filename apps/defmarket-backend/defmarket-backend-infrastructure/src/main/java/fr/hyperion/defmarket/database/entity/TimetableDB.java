package fr.hyperion.defmarket.database.entity;

import java.time.DayOfWeek;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Audited
@NoArgsConstructor
@Table(name = "timetable", schema = "defmarket")
public class TimetableDB extends AbstractEntity {

    @Id
    @SequenceGenerator(name = "timetable_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "timetable_seq")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week")
    private DayOfWeek day;

    @Column(name = "is_open_24h")
    private boolean open24h;

    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL)
    private List<WorkingTimeDB> workingTime = new LinkedList<>();

    @Column(name = "is_active")
    private boolean active;

    @ManyToOne(optional = false)
    @JoinColumn(name = "store_id")
    private StoreDB store;

    public void addWorkingTime(final WorkingTimeDB workingTime) {
        workingTime.setTimetable(this);
        this.workingTime.add(workingTime);
    }

    public void removeWorkingTime(final WorkingTimeDB workingTimeDB) {
        workingTime.removeIf(wt -> wt.getId().equals(workingTimeDB.getId()));
        workingTimeDB.setTimetable(null);
    }
}
