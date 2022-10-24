package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.AdminHistoryNotificationDB;
import fr.hyperion.defmarket.database.entity.AdminHistoryNotificationDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class AdminHistoryNotificationSpecification {
    public Specification<AdminHistoryNotificationDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(AdminHistoryNotificationDB_.deleted));
    }


}
