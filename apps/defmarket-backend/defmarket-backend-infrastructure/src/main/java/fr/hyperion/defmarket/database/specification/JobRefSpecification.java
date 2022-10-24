package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.JobDB_;
import fr.hyperion.defmarket.database.entity.JobRefDB;
import fr.hyperion.defmarket.database.entity.JobRefDB_;
import lombok.experimental.UtilityClass;

@UtilityClass
public class JobRefSpecification {

    public Specification<JobRefDB> byDepth(final Long depth) {
        if (depth == null) {
            return null;
        }
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get(JobRefDB_.depth), depth);
    }


    public Specification<JobRefDB> byParentId(final Long parentId) {
        if (parentId == null) {
            return null;
        }
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get(JobRefDB_.jobParent).get(JobDB_.id), parentId);

    }
}
