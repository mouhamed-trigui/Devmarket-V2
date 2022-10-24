package fr.hyperion.defmarket.ports.company.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.company.Company;

public interface GetAllCompanyAdapter {
    List<Company> getAllByOwnerId(Long ownerId);
}
