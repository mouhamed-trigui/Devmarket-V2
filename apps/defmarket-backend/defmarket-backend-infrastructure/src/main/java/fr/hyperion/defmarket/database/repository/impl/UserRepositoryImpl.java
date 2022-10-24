package fr.hyperion.defmarket.database.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.search.engine.search.predicate.SearchPredicate;
import org.hibernate.search.engine.search.predicate.dsl.BooleanPredicateClausesStep;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.scope.SearchScope;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Repository;

import fr.hyperion.defmarket.data.user.UserFilter;
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
import fr.hyperion.defmarket.database.repository.StoreKeeperRepositoryCustom;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class UserRepositoryImpl implements StoreKeeperRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;
    private SearchSession searchSession;

    @Override
    public Page<UserAccountDB> findAllTraders(final Pageable pageable, final UserFilter userFilter) {
        initSearchSession();
        final Boolean validated = userFilter.getValidated();
        final Boolean blocked = userFilter.getBlocked();
        final Boolean canBeValidated = userFilter.getCanBeValidated();
        final Boolean moreInfoRequestedByAdmin = userFilter.getMoreInfoRequestedByAdmin();
        final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        final CriteriaQuery<UserAccountDB> criteriaBuilderQuery = criteriaBuilder.createQuery(UserAccountDB.class);
        final Root<UserAccountDB> userAccountDBRoot = criteriaBuilderQuery.from(UserAccountDB.class);
        final ListJoin<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBRoot = userAccountDBRoot.join(UserAccountDB_.userCompanyList, JoinType.LEFT);
        Predicate predicate = criteriaBuilder.isFalse(userAccountDBRoot.get(UserAccountDB_.deleted));

        final Predicate isTrader = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.userType),
            UserTypeEnum.TRADER);
        predicate = criteriaBuilder.and(predicate, isTrader);

        if (validated != null) {
            final Predicate isValidated = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.validatedByAdmin), validated);
            predicate = criteriaBuilder.and(predicate, isValidated);
        }

        if (canBeValidated != null) {
            final Join<UserAccountCompanyDB, CompanyDB> companyJoin =
                userAccountCompanyDBRoot.join(UserAccountCompanyDB_.company);
            final ListJoin<CompanyDB, StoreDB> storeJoin = companyJoin.join(CompanyDB_.storeList, JoinType.LEFT);
            final ListJoin<StoreDB, OfferDB> offerJoin = storeJoin.join(StoreDB_.offerList, JoinType.LEFT);

            final Predicate hasJustification = criteriaBuilder.isNotNull(userAccountDBRoot.get(UserAccountDB_.justificationIdentity));
            final Predicate offerNotDeleted = criteriaBuilder.isFalse(offerJoin.get(OfferDB_.deleted));
            final Predicate hasOneOfferAtLeast = criteriaBuilder.isNotEmpty(storeJoin.get(StoreDB_.offerList));
            final Predicate profileNotCompleted = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.completeRegistration).get(CompleteRegistrationDB_.profileCompleted), true);
            Predicate profileCanBeValidated = criteriaBuilder.and(hasOneOfferAtLeast, offerNotDeleted, profileNotCompleted, hasJustification);
            if (!canBeValidated) {
                profileCanBeValidated = profileCanBeValidated.not();
            }
            predicate = criteriaBuilder.and(predicate, profileCanBeValidated);
        }
        if (moreInfoRequestedByAdmin != null) {
            final Predicate hasMoreInfoRequestedByAdmin = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.moreInfoRequestedByAdmin), moreInfoRequestedByAdmin);
            predicate = criteriaBuilder.and(predicate, hasMoreInfoRequestedByAdmin);
        }
        if (blocked != null) {
            final Predicate isBlocked = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.blocked), blocked);
            predicate = criteriaBuilder.and(predicate, isBlocked);
        }

        criteriaBuilderQuery.where(predicate).distinct(true);


        if (pageable.isUnpaged()) {
            final List<UserAccountDB> resultList = entityManager.createQuery(criteriaBuilderQuery).getResultList();
            return new PageImpl<>(resultList);
        } else {
            criteriaBuilderQuery.orderBy(QueryUtils.toOrders(pageable.getSort(), userAccountCompanyDBRoot, criteriaBuilder));
            final List<UserAccountDB> resultList = entityManager.createQuery(criteriaBuilderQuery).getResultList();
            final int start = (int) pageable.getOffset();
            final int end = Math.min((start + pageable.getPageSize()), resultList.size());
            return new PageImpl<>(resultList.subList(start, end), pageable, resultList.size());
        }

    }

    @Override
    public UserAccountDB findNextUser(final Long currentUserId, final UserFilter userFilter, final boolean desc,
                                      final UserTypeEnum userType) {
        initSearchSession();
        final Boolean validated = userFilter.getValidated();
        final Boolean blocked = userFilter.getBlocked();
        final Boolean canBeValidated = userFilter.getCanBeValidated();
        final Boolean moreInfoRequestedByAdmin = userFilter.getMoreInfoRequestedByAdmin();
        final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        final CriteriaQuery<UserAccountDB> criteriaBuilderQuery = criteriaBuilder.createQuery(UserAccountDB.class);
        final Root<UserAccountDB> userAccountDBRoot = criteriaBuilderQuery.from(UserAccountDB.class);
        final ListJoin<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBRoot =
            userAccountDBRoot.join(UserAccountDB_.userCompanyList, JoinType.LEFT);
        Predicate predicate = criteriaBuilder.isFalse(userAccountDBRoot.get(UserAccountDB_.deleted));
        final Predicate isTrader = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.userType), userType);

        final Predicate nextUsers;
        if (desc) {
            nextUsers = criteriaBuilder.lessThan(userAccountDBRoot.get(UserAccountDB_.id), currentUserId);
        } else {
            nextUsers = criteriaBuilder.greaterThan(userAccountDBRoot.get(UserAccountDB_.id), currentUserId);
        }
        predicate = criteriaBuilder.and(predicate, nextUsers, isTrader);

        if (validated != null) {
            final Predicate isValidated = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.validatedByAdmin), validated);
            predicate = criteriaBuilder.and(predicate, isValidated);
        }

        if (canBeValidated != null) {
            final Join<UserAccountCompanyDB, CompanyDB> companyJoin = userAccountCompanyDBRoot.join(UserAccountCompanyDB_.company);
            final ListJoin<CompanyDB, StoreDB> storeJoin = companyJoin.join(CompanyDB_.storeList);
            final ListJoin<StoreDB, OfferDB> offerJoin = storeJoin.join(StoreDB_.offerList);
            final Predicate hasJustification = criteriaBuilder.isNotNull(userAccountDBRoot.get(UserAccountDB_.justificationIdentity));
            final Predicate offerNotDeleted = criteriaBuilder.isFalse(offerJoin.get(OfferDB_.deleted));
            final Predicate hasOneOfferAtLeast = criteriaBuilder.isNotEmpty(storeJoin.get(StoreDB_.offerList));
            final Predicate profileNotCompleted = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.completeRegistration).get(CompleteRegistrationDB_.profileCompleted), false);
            Predicate profileCanBeValidated = criteriaBuilder.and(hasOneOfferAtLeast, offerNotDeleted, profileNotCompleted, hasJustification);
            if (!canBeValidated) {
                profileCanBeValidated = profileCanBeValidated.not();
            }
            predicate = criteriaBuilder.and(predicate, profileCanBeValidated);
        }
        if (moreInfoRequestedByAdmin != null) {
            final Predicate hasMoreInfoRequestedByAdmin = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.moreInfoRequestedByAdmin), moreInfoRequestedByAdmin);
            predicate = criteriaBuilder.and(predicate, hasMoreInfoRequestedByAdmin);
        }
        if (blocked != null) {
            final Predicate isBlocked = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.blocked), blocked);
            predicate = criteriaBuilder.and(predicate, isBlocked);
        }

        criteriaBuilderQuery.where(predicate).distinct(true);
        final List<UserAccountDB> resultList = entityManager.createQuery(criteriaBuilderQuery).getResultList();

        if (resultList.isEmpty()) {
            return null;
        } else {
            if (desc) {
                return resultList.get(resultList.size() - 1);
            }
            return resultList.get(0);
        }
    }

    @Override
    public Long countTraders(final UserFilter userFilter, final UserTypeEnum userType) {
        initSearchSession();
        final Boolean validated = userFilter.getValidated();
        final Boolean blocked = userFilter.getBlocked();
        final Boolean canBeValidated = userFilter.getCanBeValidated();
        final Boolean moreInfoRequestedByAdmin = userFilter.getMoreInfoRequestedByAdmin();
        final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        final CriteriaQuery<Long> criteriaBuilderQuery = criteriaBuilder.createQuery(Long.class);
        final Root<UserAccountDB> userAccountDBRoot = criteriaBuilderQuery.from(UserAccountDB.class);
        final ListJoin<UserAccountDB, UserAccountCompanyDB> userAccountCompanyDBRoot =
            userAccountDBRoot.join(UserAccountDB_.userCompanyList, JoinType.LEFT);
        Predicate predicate = criteriaBuilder.isFalse(userAccountDBRoot.get(UserAccountDB_.deleted));
        final Predicate isTarder = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.userType), userType);

        if (validated != null) {
            final Predicate isValidated = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.validatedByAdmin), validated);
            predicate = criteriaBuilder.and(predicate, isValidated, isTarder);
        }

        if (canBeValidated != null) {
            final Join<UserAccountCompanyDB, CompanyDB> companyJoin = userAccountCompanyDBRoot.join(UserAccountCompanyDB_.company);
            final ListJoin<CompanyDB, StoreDB> storeJoin = companyJoin.join(CompanyDB_.storeList);
            final ListJoin<StoreDB, OfferDB> offerJoin = storeJoin.join(StoreDB_.offerList);
            final Predicate hasJustification = criteriaBuilder.isNotNull(userAccountDBRoot.get(UserAccountDB_.justificationIdentity));
            final Predicate offerNotDeleted = criteriaBuilder.isFalse(offerJoin.get(OfferDB_.deleted));
            final Predicate hasOneOfferAtLeast = criteriaBuilder.isNotEmpty(storeJoin.get(StoreDB_.offerList));
            final Predicate profileNotCompleted = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.completeRegistration).get(CompleteRegistrationDB_.profileCompleted), false);
            Predicate profileCanBeValidated = criteriaBuilder.and(hasOneOfferAtLeast, offerNotDeleted, profileNotCompleted, hasJustification);
            if (!canBeValidated) {
                profileCanBeValidated = profileCanBeValidated.not();
            }
            predicate = criteriaBuilder.and(predicate, profileCanBeValidated);
        }
        if (moreInfoRequestedByAdmin != null) {
            final Predicate hasMoreInfoRequestedByAdmin = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.moreInfoRequestedByAdmin), moreInfoRequestedByAdmin);
            predicate = criteriaBuilder.and(predicate, hasMoreInfoRequestedByAdmin);
        }
        if (blocked != null) {
            final Predicate isBlocked = criteriaBuilder.equal(userAccountDBRoot.get(UserAccountDB_.blocked), blocked);
            predicate = criteriaBuilder.and(predicate, isBlocked);
        }

        criteriaBuilderQuery.select(criteriaBuilder.countDistinct(userAccountDBRoot)).where(predicate);

        return entityManager.createQuery(criteriaBuilderQuery).getSingleResult();
    }


    @Override
    public Page<UserAccountDB> findByDetails(final Pageable pageable, final String input, final UserTypeEnum userType) {
        initSearchSession();
        final List<UserAccountDB> result = searchSession.search(UserAccountDB.class).where(searchPredicateFactory -> {
            final BooleanPredicateClausesStep<?> predicateMust = searchPredicateFactory.bool();
            final SearchPredicate userTypePredicate =
                getSearchScope().predicate().match().field(UserAccountDB_.USER_TYPE)
                    .matching(userType)
                    .toPredicate();
            predicateMust.must(userTypePredicate);

            final SearchPredicate notDeleted = getSearchScope().predicate()
                .match().field(UserAccountDB_.DELETED)
                .matching(false)
                .toPredicate();
            predicateMust.must(notDeleted);

            if (input != null) {
                final BooleanPredicateClausesStep<?> predicate = searchPredicateFactory.bool();
                final String[] listInput = input.split(" ");
                for (final String searchParam : listInput
                ) {
                    final SearchPredicate firstNamePredicate = getSearchScope().predicate()
                        .wildcard()
                        .field(UserAccountDB_.FIRST_NAME)
                        .matching("*" + searchParam + "*").toPredicate();

                    predicate.should(firstNamePredicate);


                    final SearchPredicate lastNamePredicate = getSearchScope().predicate()
                        .wildcard()
                        .field(UserAccountDB_.LAST_NAME)
                        .matching("*" + searchParam + "*").toPredicate();
                    predicate.should(lastNamePredicate);


                    final SearchPredicate emailPredicate = getSearchScope().predicate()
                        .wildcard()
                        .field(UserAccountDB_.EMAIL)
                        .matching("*" + searchParam + "*").toPredicate();
                    predicate.should(emailPredicate);

                    predicateMust.must(predicate);
                }
            }
            return predicateMust;
        }).fetchAllHits();
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), result.size());
        return new PageImpl<>(result.subList(start, end), pageable, result.size());
    }

    private void initSearchSession() {
        try {
            searchSession = Search.session(entityManager);

            final MassIndexer indexer = searchSession.massIndexer(UserAccountDB.class)
                .threadsToLoadObjects(7);

            indexer.startAndWait();
        } catch (final InterruptedException e) {
            log.error("Error while creating index", e);
        }
    }

    private SearchScope<UserAccountDB> getSearchScope() {
        return searchSession.scope(UserAccountDB.class);
    }
}
