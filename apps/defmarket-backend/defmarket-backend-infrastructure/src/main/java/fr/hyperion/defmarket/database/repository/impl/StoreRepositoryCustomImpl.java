package fr.hyperion.defmarket.database.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ListJoin;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.search.engine.search.predicate.SearchPredicate;
import org.hibernate.search.engine.search.predicate.dsl.BooleanPredicateClausesStep;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.scope.SearchScope;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.hibernate.spatial.predicate.JTSSpatialPredicates;
import org.locationtech.jts.geom.Point;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import fr.hyperion.defmarket.data.store.CustomerStoreFilter;
import fr.hyperion.defmarket.database.entity.AddressDB_;
import fr.hyperion.defmarket.database.entity.StoreCategoryDB_;
import fr.hyperion.defmarket.database.entity.StoreDB;
import fr.hyperion.defmarket.database.entity.StoreDB_;
import fr.hyperion.defmarket.database.entity.TimetableDB;
import fr.hyperion.defmarket.database.entity.TimetableDB_;
import fr.hyperion.defmarket.database.repository.StoreRepositoryCustom;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class StoreRepositoryCustomImpl implements StoreRepositoryCustom {
	@PersistenceContext
	private EntityManager entityManager;
	private SearchSession searchSession;

	@Override
	public Page<StoreDB> findStoreByNameOrCity(final Pageable pageable, final String input) {
		initSearchSession();
		final List<StoreDB> result = searchSession.search(StoreDB.class).where(searchPredicateFactory -> {
			final BooleanPredicateClausesStep<?> predicate = searchPredicateFactory.bool();
			final BooleanPredicateClausesStep<?> secondaryPredicate = searchPredicateFactory.bool();
			if (input != null) {
				final String[] listInput = input.split(" ");
				for (final String searchParam : listInput) {
					final SearchPredicate storeNamePredicate = getSearchScope().predicate().wildcard()
							.field(StoreDB_.NAME).matching("*" + searchParam + "*").toPredicate();
					secondaryPredicate.should(storeNamePredicate);

					final SearchPredicate cityPredicate = getSearchScope().predicate().wildcard()
							.field(StoreDB_.ADDRESS + "." + AddressDB_.CITY).matching("*" + searchParam + "*")
							.toPredicate();
					secondaryPredicate.should(cityPredicate);
				}
				predicate.must(secondaryPredicate);
			}
			final SearchPredicate isDeletedPredicate = getSearchScope().predicate().match().field(StoreDB_.DELETED)
					.matching(false).toPredicate();
			predicate.must(isDeletedPredicate);

			return predicate;
		}).fetchAllHits();
		final int start = (int) pageable.getOffset();
		final int end = Math.min((start + pageable.getPageSize()), result.size());
		return new PageImpl<>(result.subList(start, end), pageable, result.size());
	}

	@Override
	public Page<StoreDB> getTheDistanceFromOneStoreToAnother(final Pageable pageable, final Point point,
			final Double distance, final CustomerStoreFilter customerStoreFilter) {
		initSearchSession();
		final CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		final CriteriaQuery<Tuple> query = criteriaBuilder.createTupleQuery();
		final Root<StoreDB> storeRoot = query.from(StoreDB.class);

		final ParameterExpression<Point> pointParam = criteriaBuilder.parameter(Point.class);
		final ListJoin<StoreDB, TimetableDB> timetableJoin = storeRoot.join(StoreDB_.timetableList);
		query.multiselect(storeRoot, criteriaBuilder
				.function("distance", Double.class, storeRoot.get(StoreDB_.geolocation), pointParam).alias("distance"));

		// --SORT STORES BY DISTANCE --
		List<Order> orderList = new ArrayList<>();
		orderList.add(criteriaBuilder.asc(criteriaBuilder.literal(2)));
		query.orderBy(orderList);

		final Predicate notDeleted = criteriaBuilder.isFalse(storeRoot.get(StoreDB_.deleted));
		Predicate predicate = notDeleted;
		if (point != null && distance != null) {
			final Predicate diWithIn = JTSSpatialPredicates.distanceWithin(criteriaBuilder,
					storeRoot.get(StoreDB_.geolocation), point, distance);
			predicate = (criteriaBuilder.and(diWithIn, predicate));
		}

		if (customerStoreFilter.getCity() != null) {
			final Predicate byCity = criteriaBuilder.equal(storeRoot.get(StoreDB_.address).get(AddressDB_.city),
					customerStoreFilter.getCity());
			predicate = (criteriaBuilder.and(byCity, predicate));

		}
		if (customerStoreFilter.getCategoryId() != null) {
			final Predicate byCategoryId = criteriaBuilder.equal(
					storeRoot.get(StoreDB_.storeCategory).get(StoreCategoryDB_.id),
					customerStoreFilter.getCategoryId());
			predicate = (criteriaBuilder.and(byCategoryId, predicate));

		}

		final Predicate activeTimeTable = criteriaBuilder.isTrue(timetableJoin.get(TimetableDB_.active));

		query.where(criteriaBuilder.and(predicate, activeTimeTable)).distinct(true);

		final TypedQuery<Tuple> entityManagerQuery = entityManager.createQuery(query);
		entityManagerQuery.setParameter(pointParam, point);
		final List<Tuple> resultList = entityManagerQuery.getResultList();
		List<StoreDB> storeDBList = resultList.stream().map(tuple -> {
			StoreDB store = tuple.get(0, StoreDB.class);
			store.setTimetableList(store.getTimetableList().stream().filter(t -> t.isActive()).toList());
			store.setDistance(tuple.get(1, Double.class));
			return store;
		}).toList();

		final int start = (int) pageable.getOffset();
		final int end = Math.min((start + pageable.getPageSize()), storeDBList.size());
		return new PageImpl<>(storeDBList.subList(start, end), pageable, storeDBList.size());
	}

	private void initSearchSession() {
		try {
			searchSession = Search.session(entityManager);

			final MassIndexer indexer = searchSession.massIndexer(StoreDB.class).threadsToLoadObjects(7);

			indexer.startAndWait();
		} catch (final InterruptedException e) {
			log.error("Error while creating index", e);
		}
	}

	private SearchScope<StoreDB> getSearchScope() {
		return searchSession.scope(StoreDB.class);
	}
}
