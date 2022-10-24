package fr.hyperion.defmarket.database.specification;

import org.springframework.data.jpa.domain.Specification;

import fr.hyperion.defmarket.database.entity.ExpoTokenDB;
import fr.hyperion.defmarket.database.entity.ExpoTokenDB_;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ExpoTokenSpecification {

	public Specification<ExpoTokenDB> byExpoToken(final String expoToken) {
		if (expoToken == null) {
			return null;
		}
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(ExpoTokenDB_.EXPO_TOKEN), expoToken);
	}

	public Specification<ExpoTokenDB> byUserAccount(final UserAccountDB userAccountDB) {
		if (userAccountDB == null) {
			return null;
		}
		return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(ExpoTokenDB_.USER_ACCOUNT_DB),
				userAccountDB);
	}

}
