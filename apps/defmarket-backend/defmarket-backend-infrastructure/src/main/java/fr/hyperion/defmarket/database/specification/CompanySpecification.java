package fr.hyperion.defmarket.database.specification;

import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.CompanyDB_;
import fr.hyperion.defmarket.database.entity.CompleteRegistrationDB_;
import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.OfferDB_;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB_;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CompanySpecification {
    public Specification<CompanyDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(CompanyDB_.deleted));
    }

    public Specification<CompanyDB> validatedByAdmin(final Boolean validated) {
        if (validated == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(CompanyDB_.validatedByAdmin),
            validated);
    }

    public Specification<CompanyDB> canBeValidated(final Boolean canBeValidated) {
        if (canBeValidated == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final ListJoin<CompanyDB, StoreDB> storeJoin = root.join(CompanyDB_.storeList);
            final ListJoin<StoreDB, OfferDB> offerJoin = storeJoin.join(StoreDB_.offerList);
            final Predicate offerNotDeleted = criteriaBuilder.isFalse(offerJoin.get(OfferDB_.deleted));

            Predicate hasOneOfferAtLeast = criteriaBuilder.isNotEmpty(storeJoin.get(StoreDB_.offerList));
            if (!canBeValidated) {
                hasOneOfferAtLeast = hasOneOfferAtLeast.not();
            }

            final ListJoin<CompanyDB, UserAccountCompanyDB> userCompanyJoin = root.join(CompanyDB_.userCompanyList);
            final Path<UserAccountDB> userAccountDBPath = userCompanyJoin.get(UserAccountCompanyDB_.userAccount);
            final Predicate profileNotCompleted =
                criteriaBuilder.equal(userAccountDBPath.get(UserAccountDB_.completeRegistration).get(CompleteRegistrationDB_.companyCompleted), canBeValidated);
            return criteriaBuilder.and(hasOneOfferAtLeast, offerNotDeleted, profileNotCompleted);
        };
    }

    public Specification<CompanyDB> isBlocked(final Boolean blocked) {
        if (blocked == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(CompanyDB_.blocked), blocked);
    }

    public Specification<CompanyDB> getCompanyByUserID(final Long userId) {
        if (userId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {

            final ListJoin<CompanyDB, UserAccountCompanyDB> userCompanyJoin = root.join(CompanyDB_.userCompanyList);
            final Path<Long> longPath = userCompanyJoin.get(UserAccountCompanyDB_.userAccount).get(UserAccountDB_.id);
            return criteriaBuilder.equal(longPath, userId);
        };
    }

    public Specification<CompanyDB> getByID(final Long companyId) {
        if (companyId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(CompanyDB_.id), companyId);
    }

    // get next company with id > companyId
    public Specification<CompanyDB> getNextCompany(final Long companyId, final boolean descending) {
        if (companyId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            if (descending) {
                return criteriaBuilder.lessThan(root.get(CompanyDB_.id), companyId);
            }
            return criteriaBuilder.greaterThan(root.get(CompanyDB_.id), companyId);
        };
    }

    public Specification<CompanyDB> getBySiren(final String siren) {
        if (siren == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(CompanyDB_.siren), siren);
    }

}
