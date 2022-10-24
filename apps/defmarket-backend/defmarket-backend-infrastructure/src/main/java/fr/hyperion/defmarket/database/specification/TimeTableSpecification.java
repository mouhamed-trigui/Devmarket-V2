package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.database.entity.TimetableDB;
import fr.hyperion.defmarket.database.entity.TimetableDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class TimeTableSpecification {

	public Specification<TimetableDB> byStoreId(final Long storeId) {
		if (storeId == null) {
			return null;
		}
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(TimetableDB_.store).get(StoreDB_.id),
				storeId);
	}

	public Specification<TimetableDB> byStatus(final Boolean status) {
		if (status == null) {
			return null;
		}
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(TimetableDB_.active), status);
	}
}
