package fr.hyperion.defmarket.dto.response.store;

import java.util.List;

import fr.hyperion.defmarket.dto.response.timetable.TimetableResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreWithTimeTableResponse extends StoreResponse {

	public List<TimetableResponse> timeTable;

	public Double distance;
}
