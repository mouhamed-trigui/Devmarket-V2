package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.UserAccountDB_;
import fr.hyperion.defmarket.database.entity.UserNotificationDB;
import fr.hyperion.defmarket.database.entity.UserNotificationDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserNotificationSpecification {
    public Specification<UserNotificationDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(UserNotificationDB_.deleted));
    }

    public Specification<UserNotificationDB> getByOwnerId(final Long ownerId) {
        if (ownerId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(UserNotificationDB_.owner).get(UserAccountDB_.id), ownerId);

    }
}
