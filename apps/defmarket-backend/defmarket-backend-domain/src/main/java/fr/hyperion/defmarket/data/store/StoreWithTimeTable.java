package fr.hyperion.defmarket.data.store;

import java.util.List;

import fr.hyperion.defmarket.data.timetable.Timetable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreWithTimeTable extends Store {

	private List<Timetable> timetableList;
	
	private Double distance;

}
