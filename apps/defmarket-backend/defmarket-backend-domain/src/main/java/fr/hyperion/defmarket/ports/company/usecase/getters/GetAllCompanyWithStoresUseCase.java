package fr.hyperion.defmarket.ports.company.usecase.getters;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;

public interface GetAllCompanyWithStoresUseCase {
    Page<CompanyWithStoresNbrAndOwner> getCompaniesByOwnerId(Long ownerId, Pageable pageable);
}
