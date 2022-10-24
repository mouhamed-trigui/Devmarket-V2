package fr.hyperion.defmarket.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.UserFilter;
import fr.hyperion.defmarket.database.entity.UserAccountDB;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;

public interface StoreKeeperRepositoryCustom {
    Page<UserAccountDB> findAllTraders(Pageable pageable, UserFilter userFilter);

    UserAccountDB findNextUser(Long currentUserId, UserFilter userFilter, boolean desc, UserTypeEnum userType);

    Long countTraders(UserFilter userFilter, UserTypeEnum userType);

    Page<UserAccountDB> findByDetails(Pageable pageable, String input, UserTypeEnum userType);
}
