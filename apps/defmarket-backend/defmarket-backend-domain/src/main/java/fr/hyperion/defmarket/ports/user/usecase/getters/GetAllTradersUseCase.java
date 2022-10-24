package fr.hyperion.defmarket.ports.user.usecase.getters;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.user.OperatorWithCompanies;
import fr.hyperion.defmarket.data.user.UserFilter;

public interface GetAllTradersUseCase {
    Page<OperatorWithCompanies> getAllTraders(Pageable pageable, UserFilter userFilter);

}
