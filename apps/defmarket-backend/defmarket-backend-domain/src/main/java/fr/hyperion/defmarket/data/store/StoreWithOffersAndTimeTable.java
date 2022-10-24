package fr.hyperion.defmarket.data.store;

import java.util.List;

import fr.hyperion.defmarket.data.offer.Offer;
import fr.hyperion.defmarket.data.timetable.Timetable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreWithOffersAndTimeTable extends Store {

	private List<Offer> offers;

	private List<Timetable> timeTable;

	private Double distance;

}
