package fr.hyperion.defmarket.ports.company.persistence;

import java.util.List;

import fr.hyperion.defmarket.data.company.Company;

public interface GetCompanyBySirenAdapter {
    List<Company> getBySiren(String siren);
}
