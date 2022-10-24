package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.RedirectMappingDB;
import fr.hyperion.defmarket.database.entity.RedirectMappingDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class RedirectionSpecification {

    public Specification<RedirectMappingDB> byUuid(final String uuid) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(RedirectMappingDB_.uuid), uuid);
    }
}
