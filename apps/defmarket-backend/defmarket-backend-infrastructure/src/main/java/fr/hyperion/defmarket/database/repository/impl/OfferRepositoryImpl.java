package fr.hyperion.defmarket.database.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.search.engine.search.predicate.SearchPredicate;
import org.hibernate.search.engine.search.predicate.dsl.BooleanPredicateClausesStep;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.scope.SearchScope;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import fr.hyperion.defmarket.database.entity.OfferDB;
import fr.hyperion.defmarket.database.entity.OfferDB_;
import fr.hyperion.defmarket.database.repository.OfferRepositoryCustom;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class OfferRepositoryImpl implements OfferRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;
    private SearchSession searchSession;


    @Override
    public Page<OfferDB> findByOfferByName(final Pageable pageable, final String offerName) {
        initSearchSession();
        final String seachParam = offerName.trim();
        final List<OfferDB> result = searchSession.search(OfferDB.class).where(searchPredicateFactory -> {
            final BooleanPredicateClausesStep<?> predicate = searchPredicateFactory.bool();
            final SearchPredicate offerNamePredicate = getSearchScope().predicate()
                .wildcard()
                .field(OfferDB_.TITLE)
                .matching("*" + seachParam + "*").toPredicate();
            predicate.must(offerNamePredicate);

            final SearchPredicate isDeletedPredicate = getSearchScope().predicate()
                .match()
                .field(OfferDB_.DELETED)
                .matching(false).toPredicate();
            predicate.must(isDeletedPredicate);
            return predicate;
        }).fetchAllHits();

        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), result.size());
        return new PageImpl<>(result.subList(start, end), pageable, result.size());

    }

    private void initSearchSession() {
        try {
            searchSession = Search.session(entityManager);

            final MassIndexer indexer = searchSession.massIndexer(OfferDB.class)
                .threadsToLoadObjects(7);

            indexer.startAndWait();
        } catch (final InterruptedException e) {
            log.error("Error while creating index", e);
        }
    }
    private SearchScope<OfferDB> getSearchScope() {
        return searchSession.scope(OfferDB.class);
    }
}
