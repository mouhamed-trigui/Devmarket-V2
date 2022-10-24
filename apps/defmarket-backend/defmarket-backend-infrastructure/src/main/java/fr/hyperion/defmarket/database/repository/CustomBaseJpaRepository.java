package fr.hyperion.defmarket.database.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface CustomBaseJpaRepository<T, ID> extends BaseJpaRepository<T, ID>, JpaSpecificationExecutor<T> {
    @Override
    default void delete(final T entity) {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteById(final ID id) {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteAll(final Iterable<? extends T> entities) {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteAll() {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteAllById(final Iterable<? extends ID> ids) {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteAllByIdInBatch(final Iterable<ID> ids) {
        throw new RuntimeException("forbidden use");
    }

    @Override
    default void deleteAllInBatch(final Iterable<T> entities) {
        throw new RuntimeException("forbidden use");
    }

}
