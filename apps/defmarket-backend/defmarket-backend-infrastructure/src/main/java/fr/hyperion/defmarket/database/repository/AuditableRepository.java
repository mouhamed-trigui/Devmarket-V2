package fr.hyperion.defmarket.database.repository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.history.RevisionRepository;

@NoRepositoryBean
public interface AuditableRepository<T, ID> extends RevisionRepository<T, ID, Long>, BaseJpaRepository<T, ID> {
}