package fr.hyperion.defmarket.ports.company.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import fr.hyperion.defmarket.data.company.CompanyWithStoresNbrAndOwner;

public interface GetAllCompanyWithStoresAdapter {
    Page<CompanyWithStoresNbrAndOwner> getAllCompaniesWithStoresByOwnerId(Long ownerId, Pageable pageable);
}
