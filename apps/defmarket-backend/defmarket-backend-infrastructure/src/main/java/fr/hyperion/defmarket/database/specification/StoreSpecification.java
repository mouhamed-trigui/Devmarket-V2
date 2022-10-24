package fr.hyperion.defmarket.database.specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Path;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.CompanyDB_;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB_;
import fr.hyperion.defmarket.database.entity.UserAccountDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class StoreSpecification {
    public Specification<StoreDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(StoreDB_.deleted));
    }

    public Specification<StoreDB> getByID(final Long storeId) {
        if (storeId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(StoreDB_.id), storeId);
    }

    public Specification<StoreDB> getByCompany(final Long companyId) {
        if (companyId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(StoreDB_.company).get(CompanyDB_.id),
            companyId);

    }

    public Specification<StoreDB> getFirstStore(final Long userId) {
        if (userId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {

            final Join<StoreDB, CompanyDB> companyJoin = root.join(StoreDB_.company);
            final ListJoin<CompanyDB, UserAccountCompanyDB> userCompanyJoin = companyJoin
                .join(CompanyDB_.userCompanyList);
            final Path<Long> longPath = userCompanyJoin.get(UserAccountCompanyDB_.userAccount).get(UserAccountDB_.id);
            return criteriaBuilder.equal(longPath, userId);

        };
    }

    public Specification<StoreDB> hasModeration(final Boolean storeModeration) {
        if (storeModeration == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> storeModeration
            ? criteriaBuilder.isNotNull(root.get(StoreDB_.moderation))
            : criteriaBuilder.isNull(root.get(StoreDB_.moderation));
    }

    public Specification<StoreDB> validatedByAdmin(final Boolean validated) {
        if (validated == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(StoreDB_.validatedByAdmin),
            validated);
    }

    public Specification<StoreDB> isBlocked(final Boolean blocked) {
        if (blocked == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(StoreDB_.blocked), blocked);
    }

    public Specification<StoreDB> getNextStore(final Long storeId, final boolean descending) {
        if (storeId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            if (descending) {
                return criteriaBuilder.lessThan(root.get(StoreDB_.id), storeId);
            }
            return criteriaBuilder.greaterThan(root.get(StoreDB_.id), storeId);
        };
    }

    public Specification<StoreDB> canBeValidated(final Boolean canBeValidated) {
        if (canBeValidated == null) {
            return null;
        }
        if (canBeValidated) {
            return (root, query, criteriaBuilder) -> criteriaBuilder.isNotEmpty(root.get(StoreDB_.offerList));
        } else {
            return (root, query, criteriaBuilder) -> criteriaBuilder.isEmpty(root.get(StoreDB_.offerList));
        }
    }

}
