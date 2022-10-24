package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.HistoryTraceDB;
import fr.hyperion.defmarket.database.entity.HistoryTraceDB_;
import fr.hyperion.defmarket.database.entity.UserAccountDB_;
import fr.hyperion.defmarket.enumerated.historyTrace.HistoryTypeEnum;
import lombok.experimental.UtilityClass;

@UtilityClass
public class HistoryTraceSpecification {
    public Specification<HistoryTraceDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(HistoryTraceDB_.deleted));
    }

    public Specification<HistoryTraceDB> getByOwnerId(final Long ownerId) {
        if (ownerId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(HistoryTraceDB_.userAccountDB).get(UserAccountDB_.id), ownerId);

    }

    public Specification<HistoryTraceDB> getByHistoryType(final HistoryTypeEnum historyType) {
        if (historyType == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(HistoryTraceDB_.historyType), historyType);
    }
}
