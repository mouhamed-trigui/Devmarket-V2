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

import fr.hyperion.defmarket.database.entity.CompanyDB;
import fr.hyperion.defmarket.database.entity.CompanyDB_;
import fr.hyperion.defmarket.database.repository.CompanyRepositoryCustom;
import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class CompanyRepositoryImpl implements CompanyRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;
    private SearchSession searchSession;


    @Override
    public Page<CompanyDB> findByCompanyNameAndSiren(final Pageable pageable, final String input) {
        initSearchSession();
        final List<CompanyDB> result = searchSession.search(CompanyDB.class).where(searchPredicateFactory -> {
            final BooleanPredicateClausesStep<?> predicate = searchPredicateFactory.bool();
            final BooleanPredicateClausesStep<?> secondaryPredicate = searchPredicateFactory.bool();
            if (input != null) {
                final String[] listInput = input.split(" ");
                for (final String searchParam : listInput
                ) {
                    final SearchPredicate companyNamePredicate = getSearchScope().predicate()
                        .wildcard()
                        .field(CompanyDB_.NAME)
                        .matching("*" + searchParam + "*").toPredicate();
                    secondaryPredicate.should(companyNamePredicate);
                    final SearchPredicate sirenPredicate = getSearchScope().predicate()
                        .wildcard()
                        .field(CompanyDB_.SIREN)
                        .matching("*" + searchParam + "*").toPredicate();
                    secondaryPredicate.should(sirenPredicate);

                }
                predicate.must(secondaryPredicate);

            }
            final SearchPredicate isDeletedPredicate = getSearchScope().predicate()
                .match()
                .field(CompanyDB_.DELETED)
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

            final MassIndexer indexer = searchSession.massIndexer(CompanyDB.class)
                .threadsToLoadObjects(7);

            indexer.startAndWait();
        } catch (final InterruptedException e) {
            log.error("Error while creating index", e);
        }
    }
    private SearchScope<CompanyDB> getSearchScope() {
        return searchSession.scope(CompanyDB.class);
    }

}
