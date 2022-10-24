package fr.hyperion.defmarket.database.specification;

import java.time.Instant;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.OfferDB_;
import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.enumerated.company.OfferCategoryEnum;
import fr.hyperion.defmarket.enumerated.company.OfferTypeEnum;
import fr.hyperion.defmarket.enumerated.company.StatusEnum;
import fr.hyperion.defmarket.enumerated.company.ThemeTypeEnum;
import fr.hyperion.defmarket.ports.utils.DateAndTimeUseCase;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OfferSpecification {
    private DateAndTimeUseCase dateAndTimeUseCase;
    public Specification<OfferDB> notDeleted() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isFalse(root.get(OfferDB_.deleted));
    }

    public Specification<OfferDB> byID(final Long offerId) {
        if (offerId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(OfferDB_.id), offerId);
    }

    public Specification<OfferDB> byStoreId(final Long storeId) {
        if (storeId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(OfferDB_.store).get(StoreDB_.id), storeId);

    }

    public Specification<OfferDB> byOfferType(final List<OfferTypeEnum> offerTypes) {
        if (offerTypes == null || offerTypes.isEmpty()) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get(OfferDB_.offerType).in(offerTypes));

    }

    public Specification<OfferDB> byThemeType(final List<ThemeTypeEnum> themeTypes) {
        if (themeTypes == null || themeTypes.isEmpty()) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get(OfferDB_.themeType).in(themeTypes));

    }

    public Specification<OfferDB> byStatus(final StatusEnum status) {
        if (status == null) {
            return null;
        }
        final Instant currentDate = Instant.now();
        if (status == StatusEnum.ACTIVE) {
            return (root, query, criteriaBuilder) -> {
                final Predicate predicate = criteriaBuilder.greaterThan(root.get(OfferDB_.endOfOffer),
                    currentDate);
                final Predicate predicateNull = criteriaBuilder.isNull(root.get(OfferDB_.endOfOffer));
                return criteriaBuilder.or(predicate, predicateNull);
            };
        } else {
            return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get(OfferDB_.endOfOffer),
                currentDate);
        }
    }

    public Specification<OfferDB> byOfferCategory(final OfferCategoryEnum byOfferCategory) {
        if (byOfferCategory == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(OfferDB_.offerCategory), byOfferCategory);
    }
    public Specification<OfferDB> hasModeration(final Boolean offerModeration) {
        if (offerModeration == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> offerModeration ?
            criteriaBuilder.isNotNull(root.get(OfferDB_.moderation)) :
            criteriaBuilder.isNull(root.get(OfferDB_.moderation));
    }
    public Specification<OfferDB> validatedByAdmin(final Boolean validated) {
        if (validated == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(OfferDB_.validatedByAdmin),
            validated);
    }

    public Specification<OfferDB> isBlocked(final Boolean blocked) {
        if (blocked == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(OfferDB_.blocked), blocked);
    }

    public Specification<OfferDB> getNextOffer(final Long offerId, final boolean descending) {
        if (offerId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) -> {
            if (descending) {
                return criteriaBuilder.lessThan(root.get(OfferDB_.id), offerId);
            }
            return criteriaBuilder.greaterThan(root.get(OfferDB_.id), offerId);
        };
    }
}
