package fr.hyperion.defmarket.ports.user.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserFilter;

public interface GetAllTradersAdapter {
    Page<OperatorWithCompanies> getAllTraders(Pageable pageable, UserFilter userFilter);
}
