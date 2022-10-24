package fr.hyperion.defmarket.database.specification;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.AddressDB_;
import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.CompanyDB_;
import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.OfferDB_;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB_;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB;
import fr.hyperion.defmarket.database.entity.UserAccountCompanyDB_;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.database.entity.UserAccountDB_;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.experimental.UtilityClass;

@UtilityClass
public class TraderSpecification {
    public Specification<UserAccountDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(UserAccountDB_.deleted));
    }

    public Specification<UserAccountDB> canBeDeleted() {
        final Instant currentDate = Instant.now().minus(15, ChronoUnit.DAYS);
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get(UserAccountDB_.deleteRequestDate),
            currentDate);
    }

    public Specification<UserAccountDB> getByDepartement(final String departement) {
        if (departement == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(UserAccountDB_.address).get(AddressDB_.department), departement);

    }

    public Specification<UserAccountDB> getByCity(final String city) {
        if (city == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(UserAccountDB_.address).get(AddressDB_.city), city);

    }

    public Specification<UserAccountDB> getByStoreId(final Long storeId) {
        if (storeId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final Join<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBJoin =
                root.join(UserAccountDB_.userCompanyList,
                    JoinType.LEFT);
            final Join<UserAccountCompanyDB, CompanyDB> companyDBJoin =
                userAccountCompanyDBJoin.join(UserAccountCompanyDB_.company);
            final Join<CompanyDB, StoreDB> storeDBJoin = companyDBJoin.join(CompanyDB_.storeList);
            return criteriaBuilder.equal(storeDBJoin.get(StoreDB_.id), storeId);
        };
    }

    public Specification<UserAccountDB> getByStoreCategoryId(final Long storeCategryId) {
        if (storeCategryId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final Join<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBJoin =
                root.join(UserAccountDB_.userCompanyList,
                    JoinType.LEFT);
            final Join<UserAccountCompanyDB, CompanyDB> companyDBJoin =
                userAccountCompanyDBJoin.join(UserAccountCompanyDB_.company);
            final Join<CompanyDB, StoreDB> storeDBJoin = companyDBJoin.join(CompanyDB_.storeList);
            final Join<StoreDB, StoreCategoryDB> storeCategoryDBJoin = storeDBJoin.join(StoreDB_.storeCategory);
            return criteriaBuilder.equal(storeCategoryDBJoin.get(StoreCategoryDB_.id), storeCategryId);
        };
    }

    public Specification<UserAccountDB> getByStoreType(final StoreTypeEnum storeType) {
        if (storeType == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final Join<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBJoin =
                root.join(UserAccountDB_.userCompanyList,
                    JoinType.LEFT);
            final Join<UserAccountCompanyDB, CompanyDB> companyDBJoin =
                userAccountCompanyDBJoin.join(UserAccountCompanyDB_.company);
            final Join<CompanyDB, StoreDB> storeDBJoin = companyDBJoin.join(CompanyDB_.storeList);
            return criteriaBuilder.equal(storeDBJoin.get(StoreDB_.storeType), storeType);
        };
    }


    public Specification<UserAccountDB> getByCompanyId(final Long companyId) {
        if (companyId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final Join<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBJoin =
                root.join(UserAccountDB_.userCompanyList);
            final Join<UserAccountCompanyDB, CompanyDB> companyDBJoin =
                userAccountCompanyDBJoin.join(UserAccountCompanyDB_.company);
            return criteriaBuilder.equal(companyDBJoin.get(CompanyDB_.id), companyId);
        };
    }

    public Specification<UserAccountDB> getByOfferId(final Long offerId) {
        if (offerId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            final Join<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBJoin =
                root.join(UserAccountDB_.userCompanyList,
                    JoinType.LEFT);
            final Join<UserAccountCompanyDB, CompanyDB> companyDBJoin =
                userAccountCompanyDBJoin.join(UserAccountCompanyDB_.company);
            final Join<CompanyDB, StoreDB> storeDBJoin = companyDBJoin.join(CompanyDB_.storeList);
            final ListJoin<StoreDB, OfferDB> offerBBJoin = storeDBJoin.join(StoreDB_.offerList);
            return criteriaBuilder.equal(offerBBJoin.get(OfferDB_.id), offerId);
        };
    }

    public Specification<UserAccountDB> getByUserType(final UserTypeEnum userType) {
        if (userType == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(UserAccountDB_.userType), userType);
    }

    public Specification<UserAccountDB> getByUserEmail(final String email) {
        if (email == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(UserAccountDB_.email), email);
    }
}
