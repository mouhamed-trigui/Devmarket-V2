package fr.hyperion.defmarket.ports.company.persistence;

import fr.hyperion.defmarket.data.company.Company;

public interface GetOneCompanyAdapter {
    Company getById(Long id);

    Company getByIdEvenIsDeleted(Long id);
}
