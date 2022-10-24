package fr.hyperion.defmarket.adapters.timetable;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.adapters.timetable.mapper.TimetableDBMapper;
import fr.hyperion.defmarket.adapters.timetable.mapper.WorkingTimeDBMapper;
import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.TimetableDB;
import fr.hyperion.defmarket.database.repository.StoreRepository;
import fr.hyperion.defmarket.database.repository.TimetableRepository;
import fr.hyperion.defmarket.database.specification.TimeTableSpecification;
import fr.hyperion.defmarket.ports.timetable.persistence.CreateTimetableAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.GetAllTimetableAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.GetTimetableByIdAdapter;
import fr.hyperion.defmarket.ports.timetable.persistence.UpdateTimetableAdapter;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TimetableAdapter
		implements CreateTimetableAdapter, UpdateTimetableAdapter, GetAllTimetableAdapter, GetTimetableByIdAdapter {

	private final TimetableRepository timetableRepository;
	private final StoreRepository storeRepository;

	private final TimetableDBMapper timetableDBMapper;
	private final WorkingTimeDBMapper workingTimeDBMapper;

	@Override
	@Transactional
	public Timetable create(final Long storeId, final Timetable timetable) {
		final StoreDB store = storeRepository.getReferenceById(storeId);
		final TimetableDB timetableDB = timetableDBMapper.toDB(timetable, store);
		if (timetable.getWorkingTime() != null) {
			timetable.getWorkingTime()
					.forEach(workingTime -> timetableDB.addWorkingTime(workingTimeDBMapper.toDB(workingTime)));
		}
		timetableRepository.save(timetableDB);
		return timetableDBMapper.toTimetable(timetableDB);
	}

	@Override
	@Transactional
	public Timetable update(final Long timetableId, final Timetable timetable) {
		final TimetableDB timetableDB = timetableRepository.findById(timetableId).orElseThrow();
		timetableDBMapper.update(timetable, timetableDB);
		if (timetable.getWorkingTime() != null) {

			// remove the deleted working time
			if (timetableDB.getWorkingTime() != null) {
				final List<Long> workingTimeIds = new ArrayList<>();
				timetableDB.getWorkingTime().forEach(w -> {
					if (timetable.getWorkingTime().stream().noneMatch(wt -> wt.getId().equals(w.getId()))) {
						workingTimeIds.add(w.getId());
					}
				});
				workingTimeIds.forEach(id -> timetableDB.removeWorkingTime(timetableDB.getWorkingTime().stream()
						.filter(w -> w.getId().equals(id)).findFirst().orElseThrow()));
			}

			// add the new working time & update the existing one
			timetable.getWorkingTime().forEach(workingTime -> {
				if (workingTime.getId() == null) {
					timetableDB.addWorkingTime(workingTimeDBMapper.toDB(workingTime));
				} else {
					workingTimeDBMapper.update(workingTime, timetableDB.getWorkingTime().stream()
							.filter(w -> w.getId().equals(workingTime.getId())).findFirst().orElseThrow());
				}
			});

		} else if (timetableDB.getWorkingTime() != null) {
			timetableDB.getWorkingTime().forEach(timetableDB::removeWorkingTime);
		}
		return timetableDBMapper.toTimetable(timetableDB);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Timetable> getAllTimetableOfStore(final Long storeId, final Boolean timetableStatus) {
		final Specification<TimetableDB> specification = TimeTableSpecification.byStoreId(storeId)
				.and(TimeTableSpecification.byStatus(timetableStatus));
		final List<TimetableDB> timetableList = timetableRepository.findAll(specification);
		return timetableDBMapper.toTimetable(timetableList);
	}

	@Override
    @Transactional(readOnly = true)
	public List<Timetable> getAllTimetableOfStore(final Long storeId){
		return getAllTimetableOfStore(storeId, null);
	}

	@Override
	@Transactional(readOnly = true)
	public Timetable getById(final Long id) {
		final TimetableDB timetableDB = timetableRepository.findById(id).orElseThrow();
		return timetableDBMapper.toTimetable(timetableDB);
	}
}
